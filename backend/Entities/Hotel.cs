using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities;

public class Hotel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Location { get; set; }
    public required string Photo { get; set; }
    public int BreakfastPrice { get; set; } = 0;
    public int StandardPrice { get; set; } = 0;
    public int DeluxePrice { get; set; } = 0;
    public int SuitePrice { get; set; } = 0;
}