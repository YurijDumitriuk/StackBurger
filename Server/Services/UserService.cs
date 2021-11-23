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

        public async Task<ReturnModel<User>> GetUserById(Guid id) {
            User user = await GetUser(u => u.Id == id);
            if (user != null)
                return new ReturnModel<User>(user, 200, "User info returned");
            return new ReturnModel<User>(null, 404, "Invalid user id");
        }

        public async Task<ReturnModel<User>> GetUserByLoginModel(UserLoginModel model) {
            User user = await GetUser(u => u.Name == model.Name && u.Password == model.Password);
            if (user != null)
                return new ReturnModel<User>(user, 200, "Authorization successful");
            return new ReturnModel<User>(null, 404, "Incorrect login or password");
        }

        public async Task<ReturnModel<Guid?>> AddUser(UserRegisterModel model) {
            if (await GetUser(u => u.Name == model.Name) != null) {
                return new ReturnModel<Guid?>(null, 400, "User with this name is already registered");
            } else if (await GetUser(u => u.Phone == model.Phone) != null) {
                return new ReturnModel<Guid?>(null, 400, "User with this phone is already registered");
            }

            User user = new User(model);
            await Context.Users.AddAsync(user);
            await Context.SaveChangesAsync();

            return new ReturnModel<Guid?>(user.Id, 400, "Registration successful");
        }

        private async Task<User> GetUser(Expression<Func<User, bool>> predicate) =>
            await Context.Users.SingleOrDefaultAsync(predicate);
    }
}
