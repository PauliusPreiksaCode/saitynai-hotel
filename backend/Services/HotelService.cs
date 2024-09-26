using backend.Entities;
using backend.Interfaces;
using backend.RequestDtos.Hotel;
using backend.ResponseDtos;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class HotelService : IHotelService
{
    private readonly SystemContext _context;

    public HotelService(SystemContext context)
    {
        _context = context;
    }

    public async Task<List<HotelResponse>> GetAllHotels()
    {
        var hotels = await _context.Hotel.ToListAsync();
        return hotels.Select(h => h.ToDto()).ToList();
    }

    public async Task<HotelResponse> GetHotelById(Guid id)
    {
        var hotel = await _context.Hotel.FirstOrDefaultAsync(x => x.Id.Equals(id));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        return hotel.ToDto();
    }

    public async Task<HotelResponse> AddHotel(AddHotelRequest request)
    {
        var hotel = new Hotel
        {
            Name = request.Name,
            Location = request.Location,
            Photo = request.Photo,
            BreakfastPrice = request.BreakfastPrice,
            StandardPrice = request.StandardPrice,
            DeluxePrice = request.DeluxePrice,
            SuitePrice = request.SuitePrice
        };

        await _context.Hotel.AddAsync(hotel);
        await _context.SaveChangesAsync();

        return hotel.ToDto();
    }

    public async Task<HotelResponse> UpdateHotel(Guid id, EditHotelRequest request)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(id));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        hotel.Name = request.Name;
        hotel.Location = request.Location;
        hotel.Photo = request.Photo;
        hotel.BreakfastPrice = request.BreakfastPrice;
        hotel.StandardPrice = request.StandardPrice;
        hotel.DeluxePrice = request.DeluxePrice;
        hotel.SuitePrice = request.SuitePrice;

        await _context.SaveChangesAsync();

        return hotel.ToDto();
    }

    public async Task DeleteHotel(Guid id)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(id));
    
        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var hotelIsBooked = await _context.Order
            .Include(x => x.Hotel)
            .AnyAsync(order => order.Hotel.Id.Equals(hotel.Id));

        if (hotelIsBooked)
        {
            throw new Exception("Hotel is booked");
        }

        _context.Hotel.Remove(hotel);
        await _context.SaveChangesAsync();
    }
}