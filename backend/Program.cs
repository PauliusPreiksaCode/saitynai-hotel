using System.Text;
using backend;
using backend.Auth;
using backend.Auth.Model;
using backend.Interfaces;
using backend.Middleware;
using backend.Services;
using backend.Validation.Hotel;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

builder.Services.AddDbContext<SystemContext>(options =>
{
    options.UseSqlServer(builder.Configuration["SqlServer:ConnectionString"]);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Hotel API",
        Version = "v1"
    });
});

builder.Services.AddControllers()
    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AddHotelRequestValidator>());

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<SystemContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.MapInboundClaims = false;
    options.TokenValidationParameters.ValidAudience = builder.Configuration["Jwt:ValidAudience"];
    options.TokenValidationParameters.ValidIssuer = builder.Configuration["Jwt:ValidIssuer"];
    options.TokenValidationParameters.IssuerSigningKey =
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]));
});

builder.Services.AddAuthorization();

builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<IHotelService, HotelService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<ICalculationsService, CalculationsService>();
builder.Services.AddTransient<JwtService>();
builder.Services.AddScoped<AuthSeeder>();
builder.Services.AddTransient<SessionService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", policyBuilder => policyBuilder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

builder.Services.AddMvc();
builder.Services.AddControllers();
builder.Services.AddRazorPages();

var app = builder.Build();

app.UseMiddleware<GlobalRoutePrefixMiddleware>("/api/v1");
app.UseSwagger();
app.UseSwaggerUI();
app.UsePathBase(new PathString("/api/v1"));
app.UseRouting();
app.UseStaticFiles();

app.UseCors(options =>
{
    options.SetIsOriginAllowed(_ => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .WithExposedHeaders("Content-Disposition");
});

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapRazorPages();
});

using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<SystemContext>();
var dbSeeder = scope.ServiceProvider.GetRequiredService<AuthSeeder>();
await dbSeeder.SeedAsync();

app.Run();
