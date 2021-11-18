using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Server.Authentication;

using Server.Services;

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
            services.AddControllers();
            services.AddTransient<UserService>();
            services.AddTransient<BurgerService>();
            services.AddTransient<ComponentService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseCors(builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
            );

            if (env.IsDevelopment())         
                app.UseDeveloperExceptionPage();

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
