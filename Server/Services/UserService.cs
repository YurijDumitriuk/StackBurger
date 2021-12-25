using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class UserService {

        private StackBurgerContext Context { get; }
        public UserService(StackBurgerContext context) =>
            Context = context;

        public async Task<ReturnModel<User>> GetUserById(Guid id) {
            User user = await GetUser(u => u.Id == id);

            return user is null ?
                new ReturnModel<User>(null, 404, "Invalid user id") :
                new ReturnModel<User>(user, 200, "User info returned");
        }

        public async Task<ReturnModel<Guid?>> GetUserIdByLoginModel(UserLoginModel model) {
            User user = await GetUser(u => u.Name == model.Name);
            if (user is null)
                return new ReturnModel<Guid?>(null, 404, "Incorrect login");

            return !BCrypt.Net.BCrypt.Verify(model.Password, user.Password) ?
                new ReturnModel<Guid?>(null, 404, "Incorrect password") :
                new ReturnModel<Guid?>(user.Id, 200, "Authorization successful");
        }

        public async Task<ReturnModel<Guid?>> AddUser(UserRegisterModel model) {
            if (await GetUser(u => u.Name == model.Name) != null)
                return new ReturnModel<Guid?>(null, 400, "User with this name is already registered");
            else if (await GetUser(u => u.Phone == model.Phone) != null)
                return new ReturnModel<Guid?>(null, 400, "User with this phone is already registered");

            model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            User user = new User(model);

            await Context.Users.AddAsync(user);
            await Context.SaveChangesAsync();

            return new ReturnModel<Guid?>(user.Id, 200, "Registration successful");
        }

        private async Task<User> GetUser(Expression<Func<User, bool>> predicate) =>       
            await Context.Users.SingleOrDefaultAsync(predicate);        
    }
}
