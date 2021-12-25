using System;
using System.Collections.Generic;

namespace Server.Models {
    public class Order {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public Guid UserId { get; set; }

        public List<Burger> Burgers { get; set; }
        public Order() {
            Burgers = new List<Burger>();
        }

        public Order(OrderPostModel model): this() {
            Id = Guid.NewGuid();
            Date = model.Date;
            UserId = model.UserId;
        }
    }
}
