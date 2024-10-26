using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Auth.Model;

namespace backend.Entities;

public class Session
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string LastRefreshToken { get; set; }
    public DateTimeOffset InitiatedAt { get; set; }
    public DateTimeOffset ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }
    
    [Required]
    public required string UserId { get; set; }
    [ForeignKey("UserId")]
    public User User { get; set; }
}