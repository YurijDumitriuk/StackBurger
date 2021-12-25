using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
    [ApiController] [Route("/api/[controller]")]
    public class ComponentController : ControllerBase {

        private ComponentService Service { get; }
        public ComponentController(ComponentService service) =>
            Service = service;

        [HttpGet]
        public async Task<ReturnModel<object>> Get() =>
            await Task.Run(() => Service.GetComponents());        
    }
}
