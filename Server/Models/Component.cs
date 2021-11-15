using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models {
    public class Component {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public decimal Price { get; set; }
        public decimal Calories { get; set; }
        public decimal Weight { get; set; }

        [JsonIgnore]
        public List<Burger> Burgers { get; set; }
        public Component()
        {
            Burgers = new List<Burger>();
        }
    }
}
