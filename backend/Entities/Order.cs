using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Enums;

namespace backend.Entities;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public RoomType RoomType { get; set; }

    public bool Breakfast { get; set; }

    public DateTime OrderDate { get; set; }

    public int PeopleCount { get; set; }

    public int Period { get; set; }

    public decimal Price { get; set; }

    public required Hotel Hotel { get; set; }
}