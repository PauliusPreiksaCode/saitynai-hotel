using backend.Auth.Model;
using Microsoft.AspNetCore.Identity;

namespace backend.Auth;

public class AuthSeeder
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;

    public AuthSeeder(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    public async Task SeedAsync()
    {
        await AddDefaultRolesAsync();
        await AddAdminUserAsync();
    }

    private async Task AddAdminUserAsync()
    {
        var newAdmin = new User()
        {
            Name = "admin1",
            Surname = "admin1",
            UserName = "admin1",
            Email = "admin1@admin.ktu"
        };

        var existAdminUser = await _userManager.FindByNameAsync(newAdmin.UserName);
        if (existAdminUser is null)
        {
            var createdAdmin = await _userManager.CreateAsync(newAdmin, _configuration["Admin:Password"]);
            if (createdAdmin.Succeeded)
            {
                await _userManager.AddToRoleAsync(newAdmin, Roles.Admin);
            }
        }
    }

    private async Task AddDefaultRolesAsync()
    {
        foreach (var role in Roles.All)
        {
            var roleExist = await _roleManager.RoleExistsAsync(role);
            if (!roleExist)
                await _roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}