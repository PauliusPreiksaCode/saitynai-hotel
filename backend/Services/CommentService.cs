﻿using backend.Entities;
using backend.Interfaces;
using backend.RequestDtos.Comment;
using backend.ResponseDtos;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CommentService : ICommentService
{
    private readonly SystemContext _context;

    public CommentService(SystemContext context)
    {
        _context = context;
    }

    public async Task<List<CommentResponse>> GetAllComments(Guid hotelId, Guid orderId)
    {
        await CheckForHotelOrder(hotelId, orderId);

        var comments = await _context.Comment
            .Include(c => c.Order)
            .Include(c => c.User)
            .Where(c => c.Order.Id.Equals(orderId))
            .ToListAsync();

        return comments.Select(c => c.ToDto())
            .ToList();
    }

    public async Task<CommentResponse> GetCommentById(Guid hotelId, Guid orderId, Guid id)
    {
        await CheckForHotelOrder(hotelId, orderId);

        var comment = await _context.Comment
            .Include(c => c.Order)
            .ThenInclude(o => o.Hotel)
            .Where(c => c.Order.Id.Equals(orderId) && c.Order.Hotel.Id.Equals(hotelId))
            .FirstOrDefaultAsync(c => c.Id.Equals(id));

        if (comment is null)
        {
            throw new Exception("Comment not found");
        }
        
        return comment.ToDto();
    }

    public async Task<CommentResponse> AddComment(Guid hotelId, Guid orderId, AddCommentRequest request, string userId)
    {
        await CheckForHotelOrder(hotelId, orderId);
        
        var order = await _context.Order.FirstOrDefaultAsync(x => x.Id.Equals(orderId));

        var comment = new Comment
        {
            Text = request.Text,
            CreatedAt = DateTime.Now,
            ModifiedAt = DateTime.Now,
            Order = order!,
            UserId = userId,
        };

        await _context.Comment.AddAsync(comment);
        await _context.SaveChangesAsync();

        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
        comment.User = user;

        return comment.ToDto();
    }

    public async Task<CommentResponse> UpdateComment(Guid hotelId, Guid orderId, Guid id, EditCommentRequest request)
    {
        await CheckForHotelOrder(hotelId, orderId);

        var comment = await _context.Comment
            .Include(c => c.Order)
            .Where(c => c.Order.Id.Equals(orderId))
            .FirstOrDefaultAsync(c => c.Id.Equals(id));
        
        if (comment is null)
        {
            throw new Exception("Comment not found");
        }

        comment.Text = request.Text;
        comment.ModifiedAt = DateTime.Now;

        await _context.SaveChangesAsync();

        return comment.ToDto();
    }

    public async Task DeleteComment(Guid hotelId, Guid orderId, Guid id)
    {
        await CheckForHotelOrder(hotelId, orderId);

        var comment = await _context.Comment
            .Include(c => c.Order)
            .Where(c => c.Order.Id.Equals(orderId))
            .FirstOrDefaultAsync(c => c.Id.Equals(id) );
        
        
        if (comment is null)
        {
            throw new Exception("Comment not found");
        }

        _context.Comment.Remove(comment);
        await _context.SaveChangesAsync();
    }

    public async Task<string> GetUserIdByComment(Guid commentId)
    {
        var comment = await _context.Comment.FirstOrDefaultAsync(x => x.Id.Equals(commentId));
        
        if(comment is null)
            throw new Exception("Comment not found");
        
        return comment.UserId;
    }


    private async Task CheckForHotelOrder(Guid hotelId, Guid orderId)
    {
        var hotel = await _context.Hotel.FirstOrDefaultAsync(x => x.Id.Equals(hotelId));
        
        if (hotel is null)
        {
            throw new Exception("Hotel not found");
        }

        var order = await _context.Order
            .Include(o => o.Hotel)
            .FirstOrDefaultAsync(x => x.Id.Equals(orderId));
        
        if (order is null)
        {
            throw new Exception("Order not found");
        }

        if (!order.Hotel.Id.Equals(hotelId))
        {
            throw new Exception("Order not found for this hotel");
        }
    }
}