using backend.Interfaces;
using backend.RequestDtos.Order;
using backend.RequestDtos.Price;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("hotels/{hotelId:guid}/orders")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders([FromRoute] Guid hotelId)
    {
        try
        {
            var orders = await _orderService.GetAllOrders(hotelId);
            return Ok(orders);
        }
        catch (Exception)
        {
            return NotFound("Hotel not found");
        }
    }
    
    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetOrderById([FromRoute] Guid hotelId, [FromRoute] Guid id)
    {
        try
        {
            var order = await _orderService.GetOrderById(hotelId, id);
            return Ok(order);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                "Order not found" => NotFound("Order not found")
            };
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> AddOrder([FromRoute] Guid hotelId, [FromBody] AddOrderRequest request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return StatusCode(422, new { errors });
        }
        
        try
        {
            var order = await _orderService.AddOrder(hotelId, request);
            return CreatedAtAction(nameof(AddOrder), new { id = order.Id }, order);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                _ => StatusCode(400, "Wrong JSON format")
            };
        }
    }
    
    [HttpPut]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateOrder([FromRoute] Guid hotelId, [FromRoute] Guid id, [FromBody] EditOrderRequest request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return StatusCode(422, new { errors });
        }
        
        try
        {
            var order = await _orderService.UpdateOrder(hotelId, id, request);
            return Ok(order);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Order not found" => NotFound("Order not found"),
                "Hotel not found" => NotFound("Hotel not found"),
                _ => StatusCode(400, "Wrong JSON format")
            };
        }
    }
    
    [HttpDelete]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteOrder([FromRoute] Guid hotelId, [FromRoute] Guid id)
    {
        try
        {
            await _orderService.DeleteOrder(hotelId, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                "Order not found" => NotFound("Order not found"),
                "Order has comments" => NotFound("Order has comments")
            };
        }
    }
}