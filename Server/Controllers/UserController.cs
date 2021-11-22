using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
    [ApiController][Route("/api/[controller]")]
    public class UserController : ControllerBase {

        private UserService Service { get; }
        public UserController(UserService service) {
            Service = service;
        }

        [HttpGet("{id}")]
        public async Task<ReturnModel<User>> Details(Guid id) {
            User user = await Service.GetUserById(id);
            ReturnModel<User> result = new ReturnModel<User>(user, 200, "User info returned");
            if (user == null) {
                result.Message = "Invalid user id";
                result.Status = 404;
            }
            return result;
        }

        [HttpPost("register")]
        public async Task<ReturnModel<Guid>> Register(User user) {
            Guid id = await Service.AddUser(user);
            ReturnModel<Guid> result = new ReturnModel<Guid>(id, 200, "Registration successful");
            return result; 
        }

        [HttpPost("login")]
        public async Task<ReturnModel<User>> Login(UserCredentials credentials) {
            User user = await Service.GetUserByCredentials(credentials);
            ReturnModel<User> result = new ReturnModel<User>(user, 200, "User info returned");
            if (user == null) {
                result.Message = "Invalid login or password";
                result.Status = 404;
            }
            return result;
        }
    }
}
