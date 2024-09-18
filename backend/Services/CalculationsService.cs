using backend.Enums;
using backend.Interfaces;
using backend.RequestDtos.Price;

namespace backend.Services;

public class CalculationsService : ICalculationsService
{
    public decimal CalculatePrice(int peopleCount, int period, bool breakfast, RoomType roomType)
    {
        const decimal cleaningFee = 20;
        const decimal breakfastPrice = 15;

        if (period < 0 || peopleCount < 0)
        {
            throw new Exception("Values should not be negative");
        }

        decimal totalCost = 0;

        totalCost += roomType switch
        {
            RoomType.Suite => 200 * period,
            RoomType.Deluxe => 150 * period,
            RoomType.Standard => 100 * period,
            _ => throw new ArgumentOutOfRangeException(nameof(roomType), roomType, "Invalid room type")
        };

        if (breakfast)
        {
            totalCost += breakfastPrice * peopleCount * period;
        }
    
        totalCost += cleaningFee;

        return totalCost;
    }

    public decimal CalculatePrice(GetPriceRequest request)
    {
        return CalculatePrice(request.PeopleCount, request.Period, request.Breakfast, request.RoomType);
    }
}