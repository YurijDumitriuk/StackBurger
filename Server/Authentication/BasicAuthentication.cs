using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Server.Authentication {
    public class BasicAuthentication {

        private readonly RequestDelegate next;
        public BasicAuthentication(RequestDelegate next) =>
            this.next = next;

        public async Task InvokeAsync(HttpContext context) {
            string header = context.Request.Headers["Authorization"];
            if (header != null) {
                string[] parameter = System.Text.Encoding.UTF8.GetString(
                        Convert.FromBase64String(header.Split(' ')[1])
                    ).Split(':');
                if(IsAutorized(parameter[0], parameter[1])) {
                    await next(context);
                    return;
                }
            }
            context.Response.StatusCode = 401;
        }

        private bool IsAutorized(string login, string password) =>
            login == "admin" && password == "admin";
    }

    public static class BasicAuthenticationExtension {
        public static IApplicationBuilder UseBasicAuthentication(this IApplicationBuilder builder) =>
            builder.UseMiddleware<BasicAuthentication>();
    }
}
