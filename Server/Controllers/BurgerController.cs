using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
    [ApiController] [Route("/api/[controller]")]
    public class BurgerController : ControllerBase {

        private BurgerService Service { get; }
        public BurgerController(BurgerService service) {
            Service = service;
        }

        [HttpGet]
        public async Task<ReturnModel<object>> SampleBurgers() {
            return await Service.GetSampleBurgers();
        }

        [HttpGet("custom/{userId}")]
        public async Task<ReturnModel<object>> CustomBurgers(Guid? userId) {
            return await Service.GetCustomBurgersByUserId(userId);
        }

        [HttpGet("{id}")]
        public async Task<ReturnModel<Burger>> BurgerInfo(Guid? id) {
            return await Service.GetBurgerById(id);
        }

        [HttpPost]
        public async Task<ReturnModel<Guid?>> Construct(BurgerPostModel model) {
            return await Service.AddBurger(model);
        }
    }
}
