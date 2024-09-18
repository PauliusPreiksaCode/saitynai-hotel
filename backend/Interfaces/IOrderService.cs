using backend.Entities;
using backend.RequestDtos.Order;

namespace backend.Interfaces;

public interface IOrderService
{
    Task<List<Order>> GetAllOrders();
    Order GetOrderById(Guid id);
    Task AddOrder(AddOrderRequest request);
    Task UpdateOrder(EditOrderRequest request);
    Task DeleteOrder(Guid id);
}