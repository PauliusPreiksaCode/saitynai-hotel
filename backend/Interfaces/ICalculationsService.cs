using backend.Enums;
using backend.RequestDtos.Price;

namespace backend.Interfaces;

public interface ICalculationsService
{
    decimal CalculatePrice(GetPriceRequest request);
    decimal CalculatePrice(int peopleCount, int period, bool breakfast, RoomType roomType);
}