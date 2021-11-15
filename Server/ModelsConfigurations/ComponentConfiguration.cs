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
            builder.Property(c => c.Price).HasColumnName("price");
            builder.Property(c => c.Calories).HasColumnName("calories");
            builder.Property(c => c.Weight).HasColumnName("weight");
            builder.HasKey(c => c.Id);
        }
    }
}
