﻿using System;
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

        [HttpGet("{userId}")]
        public async Task<ReturnModel<object>> UserOrders(Guid? userId) {
            return await Service.GetOrdersByUserId(userId);
        }

        [HttpGet("info/{id}")]
        public async Task<ReturnModel<Order>> OrderInfo(Guid? id) {
            return await Service.GetOrderById(id);
        }

        [HttpPost]
        public async Task<ReturnModel<Guid>> MakeOrder(OrderPostModel model) {
            string cd = DateTime.Now.ToString();
            return await Service.AddOrder(model);
        }
    }
}
