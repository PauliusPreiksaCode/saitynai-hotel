namespace backend.RequestDtos.Hotel;

public record AddHotelRequest
{
    public required string Name { get; set; }
    public required string Location { get; set; }
    public required string Photo { get; set; } 
    public required int BreakfastPrice { get; set; } = 0;
    public required int StandardPrice { get; set; } = 0;
    public required int DeluxePrice { get; set; } = 0;
    public required int SuitePrice { get; set; } = 0;
}