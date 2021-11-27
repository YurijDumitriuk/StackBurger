using System;

namespace Server.Models {
    public class UserRegisterModel: UserLoginModel {
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}
