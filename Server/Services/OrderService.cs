using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class OrderService {

        private StackBurgerContext Context { get; }
        public OrderService(StackBurgerContext context) =>
            Context = context;

        public async Task<ReturnModel<object>> GetOrdersByUserId(Guid? userId) {
            if (userId is null)
                return new ReturnModel<object>(null, 400, "Incorrect user id");

            var orders = (await GetOrders(o => o.UserId == userId))
                .Select(o => new {
                    Id = o.Id,
                    Date = DateFormat(o.Date),
                    Burgers = o.Burgers.Select(b => new {
                        Id = b.Id,
                        Name = b.Name,
                        Price = b.Components.Sum(c => c.Price)
                    }),
                    Price = o.Burgers.Sum(b => b.Components.Sum(b => b.Price))
                });

            return new ReturnModel<object>(orders, 200, "All user orders returned");
        }

        public async Task<ReturnModel<object>> GetOrderById(Guid? id) {
            if (id is null)
                return new ReturnModel<object>(null, 400, "Incorrect order id");

            var order = (await GetOrders(o => o.Id == id))
                .Select(o => new {
                    Date = o.Date.ToLongDateString(),
                    Burgers = o.Burgers.Select(b => new {
                        Id = b.Id,
                        Name = b.Name,
                        Price = b.Components.Sum(c => c.Price),
                        Calories = b.Components.Sum(c => c.Calories),
                    }),
                    Price = o.Burgers.Sum(b => b.Components.Sum(c => c.Price))
                })
                .FirstOrDefault();

            return order is null ?
                new ReturnModel<object>(null, 404, "There is no such an order") :
                new ReturnModel<object>(order, 200, "Order is returned");
        }

        private async Task<List<Order>> GetOrders(Expression<Func<Order, bool>> predicate) {
            List<Order> orders;
            try {
                orders = await Context.Orders
                    .Include(o => o.Burgers)
                    .ThenInclude(b => b.Components)
                    .AsNoTracking()
                    .AsSplitQuery()
                    .Where(predicate)
                    .OrderByDescending(o => o.Date)
                    .ToListAsync();
            } catch {
                return null;
            }
            return orders;
        }

        private string DateFormat(DateTime date) {
            int totalDays = (DateTime.Now - date).Days;
            switch(totalDays) {
                case 0:
                    return "Today";
                case 1:
                    return "Yesterday";
                case 2: case 3:
                    return $"{totalDays} days ago";
            }

            int totalWeeks = totalDays / 7;
            switch (totalWeeks) {
                case 0:
                    return "This week";
                case 1:
                    return "Yesterweek";
                case 2: case 3: case 4:
                    return $"{totalWeeks} weeks ago";
            }

            int totalMonths = ((DateTime.Now.Year - date.Year) * 12) + DateTime.Now.Month - date.Month;
            switch (totalMonths) {
                case 0:
                    return "This month";
                case 1:
                    return "1 month ago";
                case 2: case 3:
                    return $"{totalWeeks} months ago";
            }

            int totalYears = DateTime.Now.Year - date.Year;
            if (totalYears == 0)
                return "This year";
            else return string.Format(
                "{0} year{1} ago", totalYears, totalYears > 1 ? "s" : "");

        }

        public async Task<ReturnModel<Guid?>> AddOrder(OrderPostModel model) {
            Order order = null;
            try {
                if (!await Context.Users.AnyAsync(u => u.Id == model.UserId))
                    return new ReturnModel<Guid?>(null, 404, "There is no user with posted id");
                order = new Order(model);

                List<OrderBurger> burgers = new List<OrderBurger>();
                for (int i = 0; i < model.BurgersIds.Count; i++) {
                    if (!await Context.Burgers.AnyAsync(b => b.Id == model.BurgersIds[i]))
                        return new ReturnModel<Guid?>(null, 404, "There is no burger with posted id");

                    burgers.Add(new OrderBurger {
                        OrderId = order.Id,
                        BurgerId = model.BurgersIds[i]
                    });
                }

                await Context.Orders.AddAsync(order);
                await Context.OrdersBurgers.AddRangeAsync(burgers);
                await Context.SaveChangesAsync();
            } catch {
                return new ReturnModel<Guid?>(null, 500, "Internal error have occured");
            }
            return new ReturnModel<Guid?>(order.Id, 200, "Order has been added");
        }
    }
}
