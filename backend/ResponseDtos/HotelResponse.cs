namespace backend.ResponseDtos;

public class HotelResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Location { get; set; }
    public required string Photo { get; set; }
    public int BreakfastPrice { get; set; }
    public int StandardPrice { get; set; }
    public int DeluxePrice { get; set; }
    public int SuitePrice { get; set; }
}