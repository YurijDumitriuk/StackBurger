using System;
using System.Threading.Tasks;
using System.Collections.Generic;
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

        [HttpGet]
        public async Task<IActionResult> GetAllUsers() {
            return Ok(await Service.GetUsers());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(Guid id) {
            return Ok(await Service.GetUserById(id));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user) {
            await Service.AddUser(user);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User user) {
            user = await Service.GetUserByCredentials(user.Name, user.Password);
            return user != null ? Ok(user) : Unauthorized();
        }
    }
}
