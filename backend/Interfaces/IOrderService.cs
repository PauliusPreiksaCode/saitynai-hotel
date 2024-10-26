using backend.Entities;
using backend.RequestDtos.Order;
using backend.ResponseDtos;

namespace backend.Interfaces;

public interface IOrderService
{
    Task<List<OrderResponse>> GetAllOrders(Guid hotelId);
    Task<OrderResponse> GetOrderById(Guid hotelId, Guid id);
    Task<OrderResponse> AddOrder(Guid hotelId, AddOrderRequest request, string userId);
    Task<OrderResponse> UpdateOrder(Guid hotelId, Guid id, EditOrderRequest request);
    Task DeleteOrder(Guid hotelId, Guid id);
    Task<string> GetUserIdByOrder(Guid orderId);
    Task<List<OrderResponse>> UserOrders(Guid hotelId, string userId);
}