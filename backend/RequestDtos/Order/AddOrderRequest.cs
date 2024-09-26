using backend.Enums;

namespace backend.RequestDtos.Order;

public record AddOrderRequest
{
    public required RoomType RoomType { get; set; }

    public required bool Breakfast { get; set; }

    public required DateTime OrderDate { get; set; }

    public required int PeopleCount { get; set; }

    public required int Period { get; set; }

}