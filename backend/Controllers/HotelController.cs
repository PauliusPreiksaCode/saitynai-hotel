using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using backend.Auth.Model;
using backend.Interfaces;
using backend.RequestDtos.Hotel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("hotels")]
public class HotelController : ControllerBase
{
    private readonly IHotelService _hotelService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HotelController(IHotelService hotelService, IHttpContextAccessor httpContextAccessor)
    {
        _hotelService = hotelService;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllHotels()
    {
        var hotels = await _hotelService.GetAllHotels();
        return Ok(hotels);
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetHotelById([FromRoute] Guid id)
    {
        try
        {
            var hotel = await _hotelService.GetHotelById(id);
            return Ok(hotel);
        }
        catch (Exception)
        {
            return NotFound("Hotel not found");
        }
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddHotel([FromBody] AddHotelRequest request)
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
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && !_httpContextAccessor.HttpContext.User.IsInRole(Roles.HotelPersonnel))
            {
                return Forbid();
            }

            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var hotel = await _hotelService.AddHotel(request, userId);
            return CreatedAtAction(nameof(AddHotel), new { id = hotel.Id }, hotel);
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                _ => StatusCode(400, "Wrong JSON format")
            };
        }
    }

    [HttpPut]
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateHotel([FromRoute] Guid id, [FromBody] EditHotelRequest request)
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
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _hotelService.GetUserIdByHotel(id))
            {
                return Forbid();
            }
            
            var hotel = await _hotelService.UpdateHotel(id, request);
            return Ok(hotel);
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

    
    [HttpDelete]
    [Authorize]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteHotel([FromRoute] Guid id)
    {
        try
        {
            if (!_httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin) && _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != await _hotelService.GetUserIdByHotel(id))
            {
                return Forbid();
            }
            
            await _hotelService.DeleteHotel(id);
            return NoContent();
        }
        catch (Exception e)
        {
            return e.Message switch
            {
                "Hotel is booked" => Conflict("Hotel cannot be deleted"),
                "Hotel not found" => NotFound("Hotel not found"),
            };
        }
    }
}