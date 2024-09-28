using backend.RequestDtos.Comment;
using backend.ResponseDtos;

namespace backend.Interfaces;

public interface ICommentService
{
    Task<List<CommentResponse>> GetAllComments(Guid hotelId, Guid orderId);
    Task<CommentResponse> GetCommentById(Guid hotelId, Guid orderId, Guid id);
    Task<CommentResponse> AddComment(Guid hotelId, Guid orderId, AddCommentRequest request);
    Task<CommentResponse> UpdateComment(Guid hotelId, Guid orderId, Guid id, EditCommentRequest request);
    Task DeleteComment(Guid hotelId, Guid orderId, Guid id);
}