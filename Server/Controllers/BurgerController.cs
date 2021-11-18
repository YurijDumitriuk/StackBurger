﻿using System;
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
        public async Task<ReturnModel<object>> GetBurgers() {
            var burgers = await Service.GetBurgers();
            return new ReturnModel<object>(burgers, 200, "All burger returned");
        }

        [HttpGet("{id}")]
        public async Task<ReturnModel<Burger>> GetBurgerById(Guid id) {
            Burger burger = await Service.GetBurgerById(id);
            return new ReturnModel<Burger>(burger, 200, "Burger returned");
        }
    }
}
