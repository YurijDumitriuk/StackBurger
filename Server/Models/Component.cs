using System;
using System.Collections.Generic;

namespace Server.Models {
    public class Component {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Url { get; set; }
        public decimal Price { get; set; }
        public decimal Calories { get; set; }
        public decimal Weight { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; }

        public List<Burger> Burgers { get; set; }
        public Component() {
            Burgers = new List<Burger>();
        }
    }
}
