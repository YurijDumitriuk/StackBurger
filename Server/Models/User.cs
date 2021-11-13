using System;
using System.Collections.Generic;

namespace Server.Models {
    public class User {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public List<Order> Orders { get; set; }
        public User() {
            Orders = new List<Order>();
        }
    }
}
