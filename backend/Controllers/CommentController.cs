using backend.Interfaces;
using backend.RequestDtos.Comment;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("hotels/{hotelId:guid}/orders/{orderId:guid}/comments")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllComments([FromRoute] Guid hotelId, [FromRoute] Guid orderId)
    {
        try
        {
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
    [Route("{id:guid}")]
    public async Task<IActionResult> GetCommentById([FromRoute] Guid hotelId, [FromRoute] Guid orderId,
        [FromRoute] Guid id)
    {
        try
        {
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
            var comment = await _commentService.AddComment(hotelId, orderId, request);
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
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteComment([FromRoute] Guid hotelId, [FromRoute] Guid orderId, [FromRoute] Guid id)
    {
        try
        {
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