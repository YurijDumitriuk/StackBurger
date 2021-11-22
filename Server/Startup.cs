using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation.AspNetCore;
using Server.Authentication;
using Server.Services;
using Server.Validation;
using Server.Checker;

namespace Server {
    public class Startup {

        private IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration) =>
            Configuration = configuration;
        
        public void ConfigureServices(IServiceCollection services) {
            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<StackBurgerContext>(
                options => options.UseSqlServer(connectionString)    
            );

            services.AddCors();

            services.AddControllers()
                .AddFluentValidation(
                    conf => conf.RegisterValidatorsFromAssemblyContaining<Startup>()
                 );

            services.AddTransient<UserService>();
            services.AddTransient<BurgerService>();
            services.AddTransient<ComponentService>();
            services.AddTransient<OrderService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseCors(builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
            );

            if (env.IsDevelopment())         
                app.UseDeveloperExceptionPage();

            app.UseDatabaseConnectivityChecker();
            //app.UseBasicAuthentication();

            app.UseRouting();
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
                endpoints.MapGet("/", async context => {
                    await context.Response.WriteAsync("Hello World!");
                });
            });
        }
    }
}
