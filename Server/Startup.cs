using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation.AspNetCore;
using Server.Authentication;
using Server.Services;
using Server.Checker;

namespace Server {
    public class Startup {

        private IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration) =>
            Configuration = configuration;
        
        public void ConfigureServices(IServiceCollection services) {
            services
                .AddCors()
                .AddTransient<UserService>()
                .AddTransient<BurgerService>()
                .AddTransient<ComponentService>()
                .AddTransient<OrderService>()
                .AddDbContext<StackBurgerContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")))
                .AddControllers()
                    .AddFluentValidation(configuration =>
                        configuration.RegisterValidatorsFromAssemblyContaining<Startup>());
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseCors(policies =>
                policies
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
            );

            app.UseDatabaseConnectivityChecker();
            //app.UseBasicAuthentication();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
                endpoints.MapControllers()
            );
        }
    }
}
