using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("users")]
    public class User
    {
        [Column("id")]
        public Guid Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("phone")]
        public string Phone { get; set; }
        [Column("address")]
        public string Address { get; set; }
        List<Order> Orders { get; set; } = new List<Order>();
    }
}
