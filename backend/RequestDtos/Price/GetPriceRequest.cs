using backend.Enums;

namespace backend.RequestDtos.Price;

public record GetPriceRequest
{
    public required RoomType RoomType { get; set; }

    public required bool Breakfast { get; set; }

    public required int PeopleCount { get; set; }

    public required int Period { get; set; }
}