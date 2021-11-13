using System;
using System.Collections.Generic;

namespace Server.Models {
    public class Burger {
        public Guid Id { get; set; }
        public bool IsCustom { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<Order> Orders { get; set; }
        public List<Component> Components { get; set; }
        public Burger() {
            Components = new List<Component>();
            Orders = new List<Order>();
        }
    }
}
