using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("burgers")]
    public class Burger
    {
        [Column("id")]
        public Guid Id { get; set; }
        [Column("custom")]
        public bool Custom { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        List<Order> Orders { get; set; } = new List<Order>();
    }
}
