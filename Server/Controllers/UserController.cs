using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {    
    [ApiController] [Route("/api/[controller]")]
    public class UserController : ControllerBase {

        private readonly UserService service;
        public UserController(UserService service) {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers() {
            return Ok(await service.GetUsers());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id) {
            return Ok(await service.GetUserById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(User user) {
            await service.AddUser(user);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> EditUser(User user) {
            await service.EditUser(user);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(Guid id) {
            await service.DeleteUser(id);
            return Ok();
        }
    }
}
