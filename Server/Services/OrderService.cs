using System;
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
            List<Order> result = await Context.Orders.Include(o => o.Burgers).ToListAsync();
            return result;
        }

        public async Task<Guid> AddOrder(Order order) {
            Context.Orders.Add(order);
            await Context.SaveChangesAsync();
            return order.Id;
        }
    }
}
