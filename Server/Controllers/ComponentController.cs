using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
    [ApiController] [Route("/api/[controller]")]
    public class ComponentController : ControllerBase {

        private ComponentService Service { get; }
        public ComponentController(ComponentService service) {
            Service = service;
        }

        [HttpGet]
        public async Task<ReturnModel<List<Component>>> Get() {
            List<Component> components = await Service.GetComponents();
            if (components == null) 
                return new ReturnModel<List<Component>>(null, 404, "Something goes wrong on resource server");            
            return new ReturnModel<List<Component>>(components, 200, "All components returned");
        }
    }
}
