using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class OrderService {

        private StackBurgerContext Context { get; }
        public OrderService(StackBurgerContext context) {
            Context = context;
        }

        public async Task<List<Order>> GetOrders() {
            List<Order> orders;
            try
            {
                orders = await Context.Orders.Include(o => o.Burgers).ToListAsync();
            }
            catch
            {
                return null;
            }
            return orders;
        }

        public async Task<object> GetOrdersByUserId(Guid userId)
        {
            List<Order> orders = new List<Order>();
            try
            {
                List<Guid> ids = await Context.Orders
                    .Where(o => o.UserId == userId)
                    .Select(o => o.Id).ToListAsync();
                foreach(Guid id in ids)
                {
                    orders.Add(await GetOrderById(id));
                }
            }
            catch
            {
                return null;
            }
            var result = orders.Select(o => new
            {
                Id = o.Id,
                Date = o.Date,
                Burgers = o.Burgers
            });
            return result;
        }

        public async Task<Order> GetOrderById(Guid id)
        {
            Order order;
            try
            {
                order = await Context.Orders.
                    SingleAsync(o => o.Id == id);
                List<Burger> burgers = await Context.OrdersBurgers
                    .Where(ob => ob.OrderId == id)
                    .Select(ob => Context.Burgers
                        .Single(b => b.Id == ob.BurgerId))
                    .ToListAsync();
                order.Burgers = burgers;
            }
            catch
            {
                return null;
            }
            return order;

        }

        public async Task<Guid> AddOrder(Order order) {
            Context.Orders.Add(order);
            await Context.SaveChangesAsync();
            return order.Id;
        }
    }
}
