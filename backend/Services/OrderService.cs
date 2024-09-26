using backend.Entities;
using backend.Interfaces;
using backend.RequestDtos.Order;
using backend.ResponseDtos;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class OrderService : IOrderService
{
    private readonly SystemContext _context;
    private readonly ICalculationsService _calculationsService;

    public OrderService(SystemContext hotelContext, ICalculationsService calculationsService)
    {
        _context = hotelContext;
        _calculationsService = calculationsService;
    }

    public async Task<List<OrderResponse>> GetAllOrders(Guid hotelId)
    {
        var hotel = await _context.Hotel.FirstOrDefaultAsync(x => x.Id.Equals(hotelId));
        
        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var orders = await _context.Order
            .Include(x => x.Hotel)
            .Where(o => o.Hotel.Id.Equals(hotelId))
            .ToListAsync();

        return orders.Select(o => o.ToDto())
            .ToList();
    }

    public async Task<OrderResponse> GetOrderById(Guid hotelId, Guid id)
    {
        var hotel = await _context.Hotel.FirstOrDefaultAsync(x => x.Id.Equals(hotelId));
        
        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var order = await _context.Order
            .Include(x => x.Hotel)
            .Where(o => o.Hotel.Id.Equals(hotelId))
            .FirstOrDefaultAsync(o => o.Id.Equals(id));
        
        if (order is null)
        {
            throw new Exception("Order not found");
        }

        return order.ToDto();
    }

    public async Task<OrderResponse> AddOrder(Guid hotelId, AddOrderRequest request)
    {
        var hotel = await _context.Hotel.FirstOrDefaultAsync(x => x.Id.Equals(hotelId));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var price = _calculationsService.CalculatePrice(request.PeopleCount, request.PeopleCount, request.Breakfast,
            request.RoomType, hotel);

        var order = new Order
        {
            RoomType = request.RoomType,
            Breakfast = request.Breakfast,
            OrderDate = request.OrderDate,
            PeopleCount = request.PeopleCount,
            Period = request.Period,
            Price = price,
            Hotel = hotel
        };

        await _context.AddAsync(order);
        await _context.SaveChangesAsync();

        return order.ToDto();
    }

    public async Task<OrderResponse> UpdateOrder(Guid hotelId, Guid id, EditOrderRequest request)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(hotelId));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var order = await _context.Order
            .Include(x => x.Hotel)
            .Where(o => o.Hotel.Id.Equals(hotelId))
            .FirstOrDefaultAsync(o => o.Id.Equals(id));
            
        if (order is null)
        {
            throw new Exception("Order not found");
        }

        var price = _calculationsService.CalculatePrice(request.PeopleCount, request.PeopleCount, request.Breakfast,
            request.RoomType, hotel);

        order.RoomType = request.RoomType;
        order.Breakfast = request.Breakfast;
        order.OrderDate = request.OrderDate;
        order.PeopleCount = request.PeopleCount;
        order.Period = request.Period;
        order.Price = price;
        order.Hotel = hotel;

        await _context.SaveChangesAsync();

        return order.ToDto();
    }

    // TODO: relation check response
    public async Task DeleteOrder(Guid hotelId, Guid id)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(hotelId));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }
        
        var order = await _context.Order
            .Include(x => x.Hotel)
            .Where(o => o.Hotel.Id.Equals(hotelId))
            .FirstOrDefaultAsync(o => o.Id.Equals(id));

        if (order is null)
        {
            throw new Exception("Order not found");
        }

        _context.Order.Remove(order);
        await _context.SaveChangesAsync();
    }
}