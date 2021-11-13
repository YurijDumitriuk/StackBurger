using System;

namespace Server.Models {
    public class OrderBurger {
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; }

        public Guid BurgerId { get; set; }
        public Burger Burger { get; set; }
    }
}
