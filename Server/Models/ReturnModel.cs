namespace Server.Models {
    public class ReturnModel<T> {
        public T Data { get; set; }
        public int Status { get; set; }
        public string Message { get; set; }

        public ReturnModel(T data, int status, string message) {
            Data = data;
            Status = status;
            Message = message;
        }
    }
}
