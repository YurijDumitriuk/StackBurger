using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.ModelsConfigurations;

namespace Server { 
    public class StackBurgerContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Burger> Burgers { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<OrderBurger> OrdersBurgers { get; set; }
        public DbSet<BurgerComponent> BurgersComponents { get; set; }

        public StackBurgerContext(DbContextOptions<StackBurgerContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) {
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new OrderConfiguration());
            builder.ApplyConfiguration(new BurgerConfiguration());
            builder.ApplyConfiguration(new ComponentConfiguration());
            builder.ApplyConfiguration(new OrderBurgerConfiguration());
            builder.ApplyConfiguration(new BurgerComponentConfiguration());

            builder.Entity<Order>()
                .HasMany(o => o.Burgers)
                .WithMany(b => b.Orders)
                .UsingEntity<OrderBurger>(
                    ob => ob.HasOne(ob => ob.Burger)
                        .WithMany()
                        .HasForeignKey(ob => ob.BurgerId),
                    ob => ob.HasOne(ob => ob.Order)
                        .WithMany()
                        .HasForeignKey(ob => ob.OrderId)
            );
            builder.Entity<Component>()
                .HasMany(c => c.Burgers)
                .WithMany(b => b.Components)
                .UsingEntity<BurgerComponent>(
                    bc => bc.HasOne(bc => bc.Burger)
                        .WithMany()
                        .HasForeignKey(bc => bc.BurgerId),
                    bc => bc.HasOne(bc => bc.Component)
                        .WithMany()
                        .HasForeignKey(bc => bc.ComponentId)
            );
        }
    }                                         
}                                             
