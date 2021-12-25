using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
    [ApiController][Route("/api/[controller]")]
    public class BurgerController : ControllerBase {

        private BurgerService Service { get; }
        public BurgerController(BurgerService service) =>
            Service = service;

        [HttpGet]
        public async Task<ReturnModel<object>> SampleBurgers() =>
            await Service.GetSampleBurgers();
        
        [HttpGet("custom/{userId}")]
        public async Task<ReturnModel<object>> CustomBurgers(Guid? userId) =>
            await Service.GetCustomBurgersByUserId(userId);
        
        [HttpGet("{id}")]
        public async Task<ReturnModel<Burger>> BurgerInfo(Guid? id) =>
            await Service.GetBurgerById(id);
        
        [HttpPost]
        public async Task<ReturnModel<Guid?>> Construct(BurgerPostModel model) =>
            await Service.AddBurger(model);       
    }
}
