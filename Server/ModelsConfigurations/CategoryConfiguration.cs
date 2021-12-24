using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.ModelsConfigurations {
    public class CategoryConfiguration : IEntityTypeConfiguration<Category> {
        public void Configure(EntityTypeBuilder<Category> builder) {
            builder.ToTable("categories");
            builder.Property(u => u.Id).HasColumnName("id");
            builder.Property(u => u.Name).HasColumnName("name");
            builder.HasKey(u => u.Id);
        }
    }
}
