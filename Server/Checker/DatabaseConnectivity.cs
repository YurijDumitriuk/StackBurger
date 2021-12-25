using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Server.Models;

namespace Server.Checker {
    public class DatabaseConnectivity {

        private RequestDelegate Next { get; }
        public DatabaseConnectivity(RequestDelegate next) => Next = next;     

        public async Task InvokeAsync(HttpContext httpContext, StackBurgerContext dbContext) {
            if (await dbContext.Database.CanConnectAsync()) {
                await Next(httpContext);
            } else {
                ReturnModel<object> result = new ReturnModel<object>(null, 503, "Service unavailable");
                await httpContext.Response.WriteAsJsonAsync(result);
            }
        }
    }

    public static class DatabaseConnectivityExtension {
        public static IApplicationBuilder UseDatabaseConnectivityChecker(this IApplicationBuilder builder) =>
            builder.UseMiddleware<DatabaseConnectivity>();
    }
}
