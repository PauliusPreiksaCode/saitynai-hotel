namespace backend.RequestDtos.Auth;

public class LoginUserRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}