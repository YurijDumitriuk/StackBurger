using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("components")]
    public class Component
    {
        [Column("id")]
        public Guid Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("url")]
        public string Url { get; set; }
        [Column("price")]
        public decimal Price { get; set; }
        [Column("caloric_content")]
        public string Calories { get; set; }
        [Column("weight")]
        public double Weight { get; set; }
        List<Burger> Burgers { get; set; } = new List<Burger>();
    }
}
