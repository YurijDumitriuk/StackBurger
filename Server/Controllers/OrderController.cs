using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
    [ApiController][Route("/api/[controller]")]
    public class OrderController : ControllerBase {

        private OrderService Service { get; }
        public OrderController(OrderService service) {
            Service = service;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetOrders() {
            List<Order> result = await Service.GetOrders();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder() {
            Order tmp = new Order {
                UserId = new Guid("061DCFBF-CAD3-4B22-313F-08D9AC2E6974"),
                Date = DateTime.Now,
                Burgers = new List<Burger> {
                    new Burger { Id = new Guid("BACF5B79-E74A-432B-9849-021B8A411DC5")},
                    new Burger { Id = new Guid("23ECC57F-486A-440F-A18D-11AA3C274602")},
                    new Burger { Id = new Guid("7555830E-EE91-4515-98F0-14224746667D")}
                }
            };
            Guid result = await Service.AddOrder(tmp);
            return Ok(result);
        }
    }
}
