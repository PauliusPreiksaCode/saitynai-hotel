using backend.Entities;
using backend.Interfaces;
using backend.RequestDtos.Order;
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

    public async Task<List<Order>> GetAllOrders()
    {
        return await _context.Order
            .Include(x => x.Hotel)
            .ToListAsync();
    }

    public Order GetOrderById(Guid id)
    {
        var order = _context.Order.FirstOrDefault(x => x.Id.Equals(id));

        if (order is null)
        {
            throw new Exception("Order not found");
        }

        return order;
    }

    public async Task AddOrder(AddOrderRequest request)
    {
        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(request.HotelId));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var price = _calculationsService.CalculatePrice(request.PeopleCount, request.PeopleCount, request.Breakfast,
            request.RoomType);

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
    }

    public async Task UpdateOrder(EditOrderRequest request)
    {
        var order = _context.Order.FirstOrDefault(x => x.Id.Equals(request.Id));

        if (order is null)
        {
            throw new Exception("Order not found");
        }

        var hotel = _context.Hotel.FirstOrDefault(x => x.Id.Equals(request.HotelId));

        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var price = _calculationsService.CalculatePrice(request.PeopleCount, request.PeopleCount, request.Breakfast,
            request.RoomType);

        order.RoomType = request.RoomType;
        order.Breakfast = request.Breakfast;
        order.OrderDate = request.OrderDate;
        order.PeopleCount = request.PeopleCount;
        order.Period = request.Period;
        order.Price = price;
        order.Hotel = hotel;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteOrder(Guid id)
    {
        var order = _context.Order.FirstOrDefault(x => x.Id.Equals(id));

        if (order is null)
        {
            throw new Exception("Order not found");
        }

        _context.Order.Remove(order);
        await _context.SaveChangesAsync();
    }
}