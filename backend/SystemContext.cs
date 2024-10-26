using backend.Auth.Model;
using backend.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend;

public class SystemContext : IdentityDbContext<User>
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
     public virtual DbSet<Session> Session { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Hotel>()
            .HasOne(h => h.HotelAdmin)
            .WithMany()
            .HasForeignKey(h => h.HotelAdminId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany()
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Comment>()
            .HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}