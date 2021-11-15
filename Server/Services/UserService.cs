using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class UserService {
        private readonly StackBurgerContext context;
        public UserService(StackBurgerContext context) {
            this.context = context;
        }

        public async Task<List<User>> GetUsers() {
            return await context.Users.ToListAsync();
        }

        public async Task<User> GetUserById(Guid id) {
            return await context.Users.SingleAsync(u => u.Id == id);
        }

        public async Task AddUser(User user) {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }

        public async Task EditUser(User user) {
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }

        public async Task DeleteUser(Guid id) {
            context.Users.Remove(new User { Id = id });
            await context.SaveChangesAsync();
        }
    }
}
