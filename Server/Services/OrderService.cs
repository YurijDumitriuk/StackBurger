using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class OrderService {

        private StackBurgerContext Context { get; }
        public OrderService(StackBurgerContext context) {
            Context = context;
        }

        public async Task<ReturnModel<object>> GetOrdersByUserId(Guid? userId) {
            if (userId == null)
                return new ReturnModel<object>(null, 400, "Incorrect user id");

            List<Guid> ids;
            try {
                ids = await Context.Orders
                    .Where(o => o.UserId == userId)
                    .Select(o => o.Id)
                    .ToListAsync();
            } catch(Exception e) {
                return new ReturnModel<object>(e.Message, 500, "Internal error have occured");
            }

            List<Order> orders = new List<Order>();
            foreach (Guid id in ids)
                orders.Add(await GetOrder(id));

            var result = orders.Select(o => new {
                Id = o.Id,
                Date = o.Date,
                Burgers = o.Burgers
            });
            return new ReturnModel<object>(result, 200, "All user orders returned");
        }

        public async Task<ReturnModel<Order>> GetOrderById(Guid? id) {
            if (id == null)
                return new ReturnModel<Order>(null, 400, "Incorrect order id");

            Order order = await GetOrder(id);

            if (order == null)
                return new ReturnModel<Order>(null, 404, "There is no such an order");
            return new ReturnModel<Order>(order, 200, "Order is returned");
        }

        private async Task<Order> GetOrder(Guid? id) {
            Order order;
            try {
                order = await Context.Orders.
                    SingleAsync(o => o.Id == id);
                order.Burgers = await Context.OrdersBurgers
                    .Where(ob => ob.OrderId == id)
                    .Select(ob => Context.Burgers
                        .Single(b => b.Id == ob.BurgerId))
                    .ToListAsync();
            } catch {
                return null;
            }
            return order;
        }

        public async Task<ReturnModel<Guid>> AddOrder(OrderPostModel model) {
            Order order = new Order(model);
            List<OrderBurger> burgers = new List<OrderBurger>();
            for (int i = 0; i < model.BurgersIds.Count; i++)
                burgers.Add(new OrderBurger {
                    OrderId = order.Id,
                    BurgerId = model.BurgersIds[i]
                });

            try {
                await Context.Orders.AddAsync(order);
                await Context.OrdersBurgers.AddRangeAsync(burgers);
                await Context.SaveChangesAsync();
            } catch {
                return new ReturnModel<Guid>(Guid.Empty, 500, "Internal error have occured");
            }
            return new ReturnModel<Guid>(order.Id, 200, "Burger has been added");
        }
    }
}
