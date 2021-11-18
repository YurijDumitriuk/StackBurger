using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Services;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("/res/components")]
    public class ComponentController : Controller
    {
        private ComponentService manager;

        public ComponentController(ComponentService _manager)
        {
            manager = _manager;
        }

        [HttpGet]
        public async Task<ReturnModel<List<Component>>> Get()
        {
            List<Component> components = await manager.Get();
            if (components == null)
            {
                return new ReturnModel<List<Component>>(null, 404, "Something goes wrong on resource server");
            }
            return new ReturnModel<List<Component>>(components, 200, "All components returned");
        }

        [HttpGet("{id}")]
        public async Task<ReturnModel<List<Component>>> Get(Guid? id)
        {
            List<Component> components = await manager.GetbyBurgerId(id);
            if (components == null)
            {
                return new ReturnModel<List<Component>>(null, 404, "Something goes wrong on resource server");
            }
            return new ReturnModel<List<Component>>(components, 200, "All burger components returned");
        }
    }
}
