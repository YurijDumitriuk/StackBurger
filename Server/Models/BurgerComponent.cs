using System;

namespace Server.Models {
    public class BurgerComponent {
        public Guid Id { get; set; }

        public int SerialNumber { get; set; }

        public Guid BurgerId { get; set; }
        public Burger Burger { get; set; }

        public Guid ComponentId { get; set; }
        public Component Component { get; set; }    
    }
}
