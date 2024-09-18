using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend;

public class SystemContext : DbContext
{
     public SystemContext()
     {
     }

     public SystemContext(DbContextOptions<SystemContext> options) : base(options)
     {
     }
     
     public virtual DbSet<Hotel> Hotel { get; set; }
     public virtual DbSet<Order> Order { get; set; }
     public virtual DbSet<Comment> Comment { get; set; }
}