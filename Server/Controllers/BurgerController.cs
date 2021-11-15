using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("/res")]
    public class BurgerController : Controller
    {
        private BurgerService manager;

        public BurgerController(BurgerService _manager)
        {
            manager = _manager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid? id)
        {
            BurgerComponent burger = await manager.GetbyId(id);

            return Ok(new ReturnModel<BurgerComponent>(burger, 200, "All burgers returned"));
        }

        [HttpGet]
        public async Task<ReturnModel<List<Burger>>> Get()
        {
            List<Burger> burgers = await manager.Get();
            if (burgers == null)
            {
                return new ReturnModel<List<Burger>>(null, 404, "Something goes wrong on resource server");
            }
            return new ReturnModel<List<Burger>>(burgers, 200, "All burgers returned");
        }

        [HttpPost]
        public ReturnModel<string> Post([FromBody] JsonElement JSdata)
        {
            Burger burger = new Burger();
            try
            {
                /*burger = new Burger(false,
                    JSdata.GetProperty("name").GetString(),
                    JSdata.GetProperty("description").GetString()
                    //JSdata.GetProperty("components").GetString().Split(',')*/
            }
            catch
            {
                return new ReturnModel<string>(null, 400, "Wrong JS Data");
            }
            if (manager.Add(burger)) { return new ReturnModel<string>(null, 200, "Data saved"); }
            return new ReturnModel<string>(null, 405, "Data not saved");
        }
    }
}
