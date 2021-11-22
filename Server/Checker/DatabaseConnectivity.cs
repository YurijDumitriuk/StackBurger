using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Server.Models;

namespace Server.Checker {
    public class DatabaseConnectivity {

        private RequestDelegate Next { get; }
        private StackBurgerContext Context { get; }
        public DatabaseConnectivity(RequestDelegate next, StackBurgerContext context) {
            Next = next;
            Context = context;
        }

        public async Task InvokeAsync(HttpContext httpContext) {
            if (await Context.Database.CanConnectAsync()) {
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
