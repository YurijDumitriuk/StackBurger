using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ReturnModel<T>
    {
        private T data;
        private int status;
        private string message;

        public T Data
        {
            get { return data; }
            set { data = value; }
        }

        public int Status
        {
            get { return status; }
            set { status = value; }
        }

        public string Message
        {
            get { return message; }
            set { message = value; }
        }

        public ReturnModel(T data, int status, string message)
        {
            this.data = data;
            this.status = status;
            this.message = message;
        }
    }
}
