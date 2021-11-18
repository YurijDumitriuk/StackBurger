using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class UserService {

        private StackBurgerContext Context { get; }
        public UserService(StackBurgerContext context) {
            Context = context;
        }

        public async Task<List<User>> GetUsers() {
            return await Context.Users.ToListAsync();
        }

        public async Task<User> GetUserById(Guid id) {
            return await Context.Users.SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task AddUser(User user) {
            await Context.Users.AddAsync(user);
            await Context.SaveChangesAsync();
        }

        public async Task<User> GetUserByCredentials(string name, string password) {
            return await Context.Users.
                SingleOrDefaultAsync(u => u.Name == name && u.Password == password);
        }
    }
}
