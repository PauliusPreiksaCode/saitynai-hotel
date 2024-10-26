using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Auth.Model;
using backend.ResponseDtos;

namespace backend.Entities;

public class Hotel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Location { get; set; }
    public required string Photo { get; set; }
    public int BreakfastPrice { get; set; } = 0;
    public int StandardPrice { get; set; } = 0;
    public int DeluxePrice { get; set; } = 0;
    public int SuitePrice { get; set; } = 0;
    
    [Required]
    public required string HotelAdminId { get; set; }
    [ForeignKey("HotelAdminId")]
    public User HotelAdmin { get; set; }

    public HotelResponse ToDto()
    {
        return new HotelResponse
        {
            Id = Id,
            Name = Name,
            Location = Location,
            Photo = Photo,
            BreakfastPrice = BreakfastPrice,
            StandardPrice = StandardPrice,
            DeluxePrice = DeluxePrice,
            SuitePrice = SuitePrice
        };
    }
}