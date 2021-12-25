using System;
using System.Collections.Generic;

namespace Server.Models {
    public class BurgerPostModel {
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public List<Guid> ComponentsIds { get; set; }

        public BurgerPostModel() {
            ComponentsIds = new List<Guid>();
        }
    }
}
