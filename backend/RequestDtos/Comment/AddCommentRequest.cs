namespace backend.RequestDtos.Comment;

public record AddCommentRequest
{
    public required string Text { get; set; }
}