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
        public async Task<ReturnModel<List<Burger>>> GetBurgers() {
            List<Burger> burgers = await Service.GetBurgers();
            if (burgers == null)           
                return new ReturnModel<List<Burger>>(null, 404, "Something goes wrong on resource server");         
            return new ReturnModel<List<Burger>>(burgers, 200, "All burgers returned");
        }

        [HttpGet("{id}")]
        public async Task<ReturnModel<Burger>> GetBurgerById(Guid id) {
            Burger burger = await Service.GetBurgerById(id);
            return new ReturnModel<Burger>(burger, 200, "All burgers returned");
        }
    }
}
