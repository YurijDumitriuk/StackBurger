using System;
using System.Collections.Generic;

namespace Server.Models {
    public class User: UserRegisterModel {
        public Guid Id { get; set; }

        public List<Order> Orders { get; set; }
        public User() {
            Orders = new List<Order>();
        }

        public User(UserRegisterModel model): this() {
            Name = model.Name;
            Password= model.Password;
            Phone= model.Phone;
            Address= model.Address;
        }
    }
}
