using System;
using System.Collections.Generic;

namespace Server.Models {
    public class OrderPostModel {
        //public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public List<Guid> BurgersIds { get; set; }
        public OrderPostModel() {
            BurgersIds = new List<Guid>();
        }
    }
}
