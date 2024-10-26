using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Auth.Model;
using backend.Enums;
using backend.ResponseDtos;

namespace backend.Entities;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public RoomType RoomType { get; set; }

    public bool Breakfast { get; set; }

    public DateTime OrderDate { get; set; }

    public int PeopleCount { get; set; }

    public int Period { get; set; }

    public decimal Price { get; set; }

    public required Hotel Hotel { get; set; }
    
    [Required]
    public required string UserId { get; set; }
    [ForeignKey("UserId")]
    public User User { get; set; }

    public OrderResponse ToDto()
    {
        return new OrderResponse
        {
            Id = Id,
            RoomType = RoomType,
            Breakfast = Breakfast,
            OrderDate = OrderDate,
            PeopleCount = PeopleCount,
            Period = Period,
            Price = Price,
            Hotel = Hotel.ToDto()
        };
    }
}