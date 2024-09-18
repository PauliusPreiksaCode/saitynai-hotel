using backend.Entities;
using backend.RequestDtos.Hotel;

namespace backend.Interfaces;

public interface IHotelService
{
    Task<List<Hotel>> GetAllHotels();
    Hotel GetHotelById(Guid id);
    Task AddHotel(AddHotelRequest request);
    Task UpdateHotel(EditHotelRequest request);
    Task DeleteHotel(Guid id);
}