using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.ModelsConfigurations {
    public class OrderBurgerConfiguration : IEntityTypeConfiguration<OrderBurger> {
        public void Configure(EntityTypeBuilder<OrderBurger> builder) {
            builder.ToTable("orders_burgers");
            builder.Property(ob => ob.Id).HasColumnName("id");
            builder.Property(ob => ob.OrderId).HasColumnName("order_id");
            builder.Property(ob => ob.BurgerId).HasColumnName("burger_id");
            builder.HasKey(ob => ob.Id);
        }
    }
}
