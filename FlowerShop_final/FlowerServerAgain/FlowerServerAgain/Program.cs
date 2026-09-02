using FlowerServerAgain.Data;
using FlowerServerAgain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
namespace FlowerServerAgain
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //var builder = WebApplication.CreateBuilder(args);
            //builder.Services.AddDbContext<FlowerServerAgainContext>(options =>
            //    options.UseSqlServer(builder.Configuration.GetConnectionString("FlowerServerAgainContext") ?? throw new InvalidOperationException("Connection string 'FlowerServerAgainContext' not found.")));
            //var app = builder.Build();

            //app.MapGet("/", () => "Hello World!");

            //app.Run();
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));
            var builder2 = builder.Services.AddIdentityCore<User>();
            IdentityBuilder identityBuilder =  new IdentityBuilder(builder2.UserType, builder.Services).AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>();
            identityBuilder.AddSignInManager<SignInManager<User>>();

            //AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = false)
            //.AddRoles<IdentityRole>()
            //.AddEntityFrameworkStores<ApplicationDbContext>();
            //builder.Services.ConfigureApplicationCookie(x =>
            //{
            //    x.ExpireTimeSpan = TimeSpan.FromDays(1);
            //});
            builder.Services.AddAuthentication("Identity.Application")
        .AddCookie("Identity.Application", options =>
        {
            options.Cookie.Name = ".FlowerShop.SharedCookie"; // Имя файла cookie
            options.LoginPath = "/login"; // Путь к странице входа
            options.AccessDeniedPath = "/Account/Forbidden"; // Путь при отказе в доступе
          
        });

            builder.Services.AddControllers();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy
                    .WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                    
                });
            });
          

            var app = builder.Build();
            app.UseStaticFiles();
            app.UseCors("AllowAll");//причина не работы корс кстати 

            app.UseRouting();


            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            app.Run();


           

        }
    }
}

