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
        public async Task<IActionResult> GetUsers() {
            return Ok(await Service.GetUsers());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id) {
            return Ok(await Service.GetUserById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(User user) {
            await Service.AddUser(user);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> EditUser(User user) {
            await Service.EditUser(user);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(Guid id) {
            await Service.DeleteUser(id);
            return Ok();
        }
    }
}
