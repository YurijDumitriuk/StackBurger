using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
    [ApiController][Route("/api/[controller]")]
    public class OrderController : ControllerBase {

        private OrderService Service { get; }
        public OrderController(OrderService service) =>
            Service = service;    

        [HttpGet("user/{userId}")]
        public async Task<ReturnModel<object>> UserOrders(Guid? userId) =>
            await Service.GetOrdersByUserId(userId);
        
        [HttpGet("info/{id}")]
        public async Task<ReturnModel<object>> OrderInfo(Guid? id) =>
            await Service.GetOrderById(id);
        
        [HttpPost]
        public async Task<ReturnModel<Guid?>> MakeOrder(OrderPostModel model) =>
            await Service.AddOrder(model);       
    }
}
