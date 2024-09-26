using backend.Entities;
using backend.Enums;

namespace backend.ResponseDtos;

public class OrderResponse
{
    public Guid Id { get; set; }

    public RoomType RoomType { get; set; }

    public bool Breakfast { get; set; }

    public DateTime OrderDate { get; set; }

    public int PeopleCount { get; set; }

    public int Period { get; set; }

    public decimal Price { get; set; }

    public required HotelResponse Hotel { get; set; }
}