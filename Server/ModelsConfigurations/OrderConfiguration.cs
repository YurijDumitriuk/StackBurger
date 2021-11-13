using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.ModelsConfigurations {
    public class OrderConfiguration : IEntityTypeConfiguration<Order> {
        public void Configure(EntityTypeBuilder<Order> builder) {
            builder.ToTable("orders");
            builder.Property(o => o.Id).HasColumnName("id");
            builder.Property(o => o.Date).HasColumnName("date");
            builder.Property(o => o.UserId).HasColumnName("user_id");
            builder.HasKey(o => o.Id);
        }
    }
}
