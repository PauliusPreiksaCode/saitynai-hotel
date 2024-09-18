using backend.Entities;
using backend.Interfaces;
using backend.RequestDtos.Hotel;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class HotelService : IHotelService
{
    private readonly SystemContext _context;

    public HotelService(SystemContext context)
    {
        _context = context;
    }

    public async Task<List<Hotel>> GetAllHotels()
    {
        var hotels = await _context.Hotel.ToListAsync();
        return hotels;
    }

    public Hotel GetHotelById(Guid id)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(id));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        return hotel;
    }

    public async Task AddHotel(AddHotelRequest request)
    {
        var hotel = new Hotel
        {
            Name = request.Name,
            Location = request.Location,
            Photo = request.Photo
        };

        await _context.Hotel.AddAsync(hotel);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateHotel(EditHotelRequest request)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(request.Id));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        hotel.Name = request.Name;
        hotel.Location = request.Location;
        hotel.Photo = request.Photo;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteHotel(Guid id)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(id));
    
        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var orders = await _context.Order
            .Include(x => x.Hotel)
            .ToListAsync();

        var hotelIsBooked = orders.Any(order => order.Hotel.Id.Equals(hotel.Id));

        if (hotelIsBooked)
        {
            throw new Exception("Hotel is booked");
        }

        _context.Hotel.Remove(hotel);
        await _context.SaveChangesAsync();
    }
}