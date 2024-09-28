using System.Text.Json;
using backend.Interfaces;
using backend.RequestDtos.Hotel;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("hotels")]
public class HotelController : ControllerBase
{
    private readonly IHotelService _hotelService;

    public HotelController(IHotelService hotelService)
    {
        _hotelService = hotelService;
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
    public async Task<IActionResult> AddHotel([FromBody] AddHotelRequest request)
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
            var hotel = await _hotelService.AddHotel(request);
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
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateHotel([FromRoute] Guid id, [FromBody] EditHotelRequest request)
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
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteHotel([FromRoute] Guid id)
    {
        try
        {
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