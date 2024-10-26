namespace backend.Auth.Model;

public class Roles
{
    public const string Admin = nameof(Admin);
    public const string Client = nameof(Client);
    public const string HotelPersonnel = nameof(HotelPersonnel);

    public static readonly IReadOnlyCollection<string> All = new[] { Admin, Client, HotelPersonnel };

}