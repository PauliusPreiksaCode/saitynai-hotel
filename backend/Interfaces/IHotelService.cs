using backend.Entities;
using backend.RequestDtos.Hotel;
using backend.ResponseDtos;

namespace backend.Interfaces;

public interface IHotelService
{
    Task<List<HotelResponse>> GetAllHotels();
    Task<HotelResponse> GetHotelById(Guid id);
    Task<HotelResponse> AddHotel(AddHotelRequest request, string userId);
    Task<HotelResponse> UpdateHotel(Guid id, EditHotelRequest request);
    Task DeleteHotel(Guid id);
    Task<string> GetUserIdByHotel(Guid hotelId);
}