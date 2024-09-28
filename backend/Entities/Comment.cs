using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.ResponseDtos;

namespace backend.Entities;

public class Comment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public required string Text { get; set; }
    public required Order Order { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime ModifiedAt { get; set; }

    public CommentResponse ToDto()
    {
        return new CommentResponse
        {
            Id = Id,
            Text = Text,
            Order = Order,
            ModifiedAt = ModifiedAt
        };
    }
}