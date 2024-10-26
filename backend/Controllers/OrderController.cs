using System.Security.Claims;
using backend.Auth.Model;
using backend.Interfaces;
using backend.RequestDtos.Order;
using backend.RequestDtos.Price;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace backend.Controllers;

[Route("hotels/{hotelId:guid}/orders")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IHotelService _hotelService;
    private readonly IHttpContextAccessor _httpContextAccessor;


    public OrderController(IOrderService orderService, IHotelService hotelService, IHttpContextAccessor httpContextAccessor)
    {
        _orderService = orderService;
        _hotelService = hotelService;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllOrders([FromRoute] Guid hotelId)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _hotelService.GetUserIdByHotel(hotelId))
            {
                return Forbid();
            }
            
            var orders = await _orderService.GetAllOrders(hotelId);
            return Ok(orders);
        }
        catch (Exception)
        {
            return NotFound("Hotel not found");
        }
    }

    [HttpGet]
    [Authorize]
    [Route("myOrders")]
    public async Task<IActionResult> GetAllMyOrders([FromRoute] Guid hotelId)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _hotelService.GetUserIdByHotel(hotelId))
            {
                return Forbid();
            }
            
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var orders = await _orderService.UserOrders(hotelId, userId);
            return Ok(orders);
        }
        catch (Exception)
        {
            return NotFound("Hotel not found");
        }
    }
    
    [HttpGet]
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetOrderById([FromRoute] Guid hotelId, [FromRoute] Guid id)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _hotelService.GetUserIdByHotel(hotelId) &&
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _orderService.GetUserIdByOrder(id))
            {
                return Forbid();
            }
            
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
    [Authorize]
    public async Task<IActionResult> AddOrder([FromRoute] Guid hotelId, [FromBody] AddOrderRequest request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            var wrongJson = errors.Any(e => e.Contains("JSON"));
            return wrongJson ? StatusCode(400, "Wrong JSON format") : StatusCode(422, new { errors });
        }
        
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && !_httpContextAccessor.HttpContext.User.IsInRole(Roles.Client))
            {
                return Forbid();
            }
            
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var order = await _orderService.AddOrder(hotelId, request, userId);
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
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateOrder([FromRoute] Guid hotelId, [FromRoute] Guid id, [FromBody] EditOrderRequest request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            var wrongJson = errors.Any(e => e.Contains("JSON"));
            return wrongJson ? StatusCode(400, "Wrong JSON format") : StatusCode(422, new { errors });
        }
        
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _orderService.GetUserIdByOrder(id))
            {
                return Forbid();
            }
            
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
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteOrder([FromRoute] Guid hotelId, [FromRoute] Guid id)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _orderService.GetUserIdByOrder(id))
            {
                return Forbid();
            }
            
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