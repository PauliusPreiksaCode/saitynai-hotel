namespace backend.RequestDtos.Hotel;

public record EditHotelRequest : AddHotelRequest
{
    public required Guid Id { get; set; }
}