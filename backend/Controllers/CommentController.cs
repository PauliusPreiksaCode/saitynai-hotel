using System.Security.Claims;
using backend.Auth.Model;
using backend.Interfaces;
using backend.RequestDtos.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace backend.Controllers;

[Route("hotels/{hotelId:guid}/orders/{orderId:guid}/comments")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;
    private readonly IHotelService _hotelService;
    private readonly IOrderService _orderService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CommentController(ICommentService commentService, IHotelService hotelService, IOrderService orderService, IHttpContextAccessor httpContextAccessor)
    {
        _commentService = commentService;
        _hotelService = hotelService;
        _orderService = orderService;
        _httpContextAccessor = httpContextAccessor;
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllComments([FromRoute] Guid hotelId, [FromRoute] Guid orderId)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _hotelService.GetUserIdByHotel(hotelId) &&
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await  _orderService.GetUserIdByOrder(orderId))
            {
                return Forbid();
            }
            
            var comments = await _commentService.GetAllComments(hotelId, orderId);
            return Ok(comments);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                "Order not found" => NotFound("Order not found"),
                "Order not found for this hotel" => NotFound("Order not found for this hotel")
            };
        }
    }
    
    [HttpGet]
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetCommentById([FromRoute] Guid hotelId, [FromRoute] Guid orderId,
        [FromRoute] Guid id)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _hotelService.GetUserIdByHotel(hotelId) &&
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _commentService.GetUserIdByComment(id))
            {
                return Forbid();
            }
            
            var comment = await _commentService.GetCommentById(hotelId,  orderId, id);
            return Ok(comment);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                "Order not found" => NotFound("Order not found"),
                "Order not found for this hotel" => NotFound("Order not found for this hotel"),
                "Comment not found" => NotFound("Comment not found"),
            };
        }
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddComment([FromRoute] Guid hotelId, [FromRoute] Guid orderId, 
        [FromBody] AddCommentRequest request)
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
                !_httpContextAccessor.HttpContext.User.IsInRole(Roles.Client) && 
                !_httpContextAccessor.HttpContext.User.IsInRole(Roles.HotelPersonnel))
            {
                return Forbid();
            }
            
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var comment = await _commentService.AddComment(hotelId, orderId, request, userId);
            return CreatedAtAction(nameof(AddComment), new { id = comment.Id }, comment);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                "Order not found" => NotFound("Order not found"),
                "Order not found for this hotel" => NotFound("Order not found for this hotel"),
                _ => StatusCode(400, "Wrong JSON format")
            };
        }
    }
    
    [HttpPut]
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateComment([FromRoute] Guid hotelId, [FromRoute] Guid orderId, [FromRoute] Guid id, 
        [FromBody] EditCommentRequest request)
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
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _commentService.GetUserIdByComment(id))
            {
                return Forbid();
            }
            
            var comment = await _commentService.UpdateComment(hotelId, orderId, id, request);
            return Ok(comment);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                "Order not found" => NotFound("Order not found"),
                "Order not found for this hotel" => NotFound("Order not found for this hotel"),
                "Comment not found" => NotFound("Comment not found"),
                _ => StatusCode(400, "Wrong JSON format")
            };
        }
    }
    
    [HttpDelete]
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteComment([FromRoute] Guid hotelId, [FromRoute] Guid orderId, [FromRoute] Guid id)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && 
                _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _commentService.GetUserIdByComment(id))
            {
                return Forbid();
            }
            
            await _commentService.DeleteComment(hotelId, orderId, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel not found" => NotFound("Hotel not found"),
                "Order not found" => NotFound("Order not found"),
                "Order not found for this hotel" => NotFound("Order not found for this hotel"),
                "Comment not found" => NotFound("Comment not found")
            };
        }
    }
}