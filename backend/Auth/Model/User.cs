using Microsoft.AspNetCore.Identity;

namespace backend.Auth.Model;

public class User : IdentityUser
{
    public String Name { get; set; }
    public String Surname { get; set; }
}