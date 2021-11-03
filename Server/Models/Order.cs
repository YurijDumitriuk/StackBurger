using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("orders")]
    public class Order
    {
        [Column("id")]
        public Guid Id { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("user_id")]
        public Guid UserId { get; set; }
        List<Burger> Burgers { get; set; } = new List<Burger>();
    }
}
