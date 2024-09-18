using backend.Interfaces;
using backend.RequestDtos.Order;
using backend.RequestDtos.Price;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("order")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ICalculationsService _calculationsService;

    public OrderController(IOrderService orderService, ICalculationsService calculationsService)
    {
        _orderService = orderService;
        _calculationsService = calculationsService;
    }

    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAllOrders()
    {
        try
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(orders);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                _ => StatusCode(500, "Error occured while getting orders")
            };
        }
    }
    
    [HttpGet]
    public async Task<IActionResult> GetOrderById([FromQuery] Guid id)
    {
        try
        {
            var order = _orderService.GetOrderById(id);
            return Ok(order);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Order not found" => NotFound("Order not found"),
                _ => StatusCode(500, "Error occured while getting order")
            };
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> AddOrder([FromBody] AddOrderRequest request)
    {
        try
        {
            await _orderService.AddOrder(request);
            return Ok();
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                _ => StatusCode(500, "Error occured while adding order")
            };
        }
    }
    
    [HttpPatch]
    public async Task<IActionResult> UpdateOrder([FromBody] EditOrderRequest request)
    {
        try
        {
            await _orderService.UpdateOrder(request);
            return Ok();
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Order not found" => NotFound("Order not found"),
                "Hotel not found" => NotFound("Hotel not found"),
                _ => StatusCode(500, "Error occured while updating order")
            };
        }
    }
    
    [HttpDelete]
    public async Task<IActionResult> DeleteOrder([FromQuery] Guid id)
    {
        try
        {
            await _orderService.DeleteOrder(id);
            return Ok();
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Order not found" => NotFound("Order not found"),
                _ => StatusCode(500, "Error occured while updating order")
            };
        }
    }

    [HttpPost]
    [Route("price")]
    public async Task<IActionResult> GetOrderPrice([FromBody] GetPriceRequest request)
    {
        try
        {
            var price = _calculationsService.CalculatePrice(request);
            return Ok(price);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                _ => StatusCode(500, "Error occured while calculating order price")
            };
        }
    }
}