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
        public async Task<ReturnModel<User>> Profile(Guid id) {
            return await Service.GetUserById(id);
        }

        [HttpPost("login")]
        public async Task<ReturnModel<User>> Login(UserLoginModel model) {
            return await Service.GetUserByLoginModel(model); ;
        }

        [HttpPost("register")]
        public async Task<ReturnModel<Guid?>> Register(UserRegisterModel model) {
            return await Service.AddUser(model);
        }
    }
}
