using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class UserService {

        private StackBurgerContext Context { get; }
        public UserService(StackBurgerContext context) {
            Context = context;
        }

        public async Task<User> GetUserById(Guid id) {
            return await GetUser(u => u.Id == id);
        }

        public async Task<User> GetUserByCredentials(UserCredentials credentials) {
            return await GetUser(u => u.Name == credentials.Name && u.Password == credentials.Password);
        }

        private async Task<User> GetUser(Expression<Func<User, bool>> predicate) =>
            await Context.Users.SingleOrDefaultAsync(predicate);

        public async Task<Guid> AddUser(User user) {
            await Context.Users.AddAsync(user);
            await Context.SaveChangesAsync();
            return user.Id;
        }
    }
}
