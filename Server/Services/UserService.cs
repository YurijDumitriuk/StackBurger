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

        public async Task<ReturnModel<Guid?>> GetUserByLoginModel(UserLoginModel model) {
            User user = await GetUser(u => u.Name == model.Name);
            if (user == null)
                return new ReturnModel<Guid?>(null, 404, "Incorrect login");
            if(!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                return new ReturnModel<Guid?>(null, 404, "Incorrect password");
            return new ReturnModel<Guid?>(user.Id, 200, "Authorization successful");
        }

        public async Task<ReturnModel<Guid?>> AddUser(UserRegisterModel model) {
            if (await GetUser(u => u.Name == model.Name) != null) {
                return new ReturnModel<Guid?>(null, 400, "User with this name is already registered");
            } else if (await GetUser(u => u.Phone == model.Phone) != null) {
                return new ReturnModel<Guid?>(null, 400, "User with this phone is already registered");
            }

            User user = new User(model);
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await Context.Users.AddAsync(user);
            await Context.SaveChangesAsync();

            return new ReturnModel<Guid?>(user.Id, 200, "Registration successful");
        }

        private async Task<User> GetUser(Expression<Func<User, bool>> predicate)
        {
            return await Context.Users.SingleOrDefaultAsync(predicate);
        }
    }
}
