
namespace backend.RequestDtos.Order;

public record EditOrderRequest : AddOrderRequest
{
    public required Guid Id { get; set; }
}