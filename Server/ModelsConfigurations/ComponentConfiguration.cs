using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.ModelsConfigurations {
    public class ComponentConfiguration : IEntityTypeConfiguration<Component> {
        public void Configure(EntityTypeBuilder<Component> builder) {
            builder.ToTable("components");
            builder.Property(c => c.Id).HasColumnName("id");
            builder.Property(c => c.Name).HasColumnName("name");
            builder.Property(c => c.Url).HasColumnName("url");
            builder.Property(c => c.Price).HasColumnName("price")
                .HasColumnType("decimal(18,2)");
            builder.Property(c => c.Calories).HasColumnName("calories")
                .HasColumnType("decimal(18,2)");
            builder.Property(c => c.Weight).HasColumnName("weight")
                .HasColumnType("decimal(18,0)");
            builder.Property(c => c.CategoryId).HasColumnName("category_id");
            builder.HasKey(c => c.Id);
            builder.HasOne(c => c.Category)
                .WithOne()
                .HasForeignKey<Component>(c => c.CategoryId);
        }
    }
}
