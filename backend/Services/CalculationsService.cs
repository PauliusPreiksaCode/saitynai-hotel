using backend.Entities;
using backend.Enums;
using backend.Interfaces;
using backend.RequestDtos.Price;

namespace backend.Services;

public class CalculationsService : ICalculationsService
{
    public decimal CalculatePrice(int peopleCount, int period, bool breakfast, RoomType roomType, Hotel hotel)
    {
        const decimal cleaningFee = 20;

        if (period < 0 || peopleCount < 0)
        {
            throw new Exception("Values should not be negative");
        }

        decimal totalCost = 0;

        totalCost += roomType switch
        {
            RoomType.Suite => hotel.SuitePrice * period,
            RoomType.Deluxe => hotel.DeluxePrice * period,
            RoomType.Standard => hotel.StandardPrice * period,
            _ => throw new ArgumentOutOfRangeException(nameof(roomType), roomType, "Invalid room type")
        };

        if (breakfast)
        {
            totalCost += hotel.BreakfastPrice * peopleCount * period;
        }
    
        totalCost += cleaningFee;

        return totalCost;
    }

    public decimal CalculatePrice(GetPriceRequest request, Hotel hotel)
    {
        return CalculatePrice(request.PeopleCount, request.Period, request.Breakfast, request.RoomType, hotel);
    }
}