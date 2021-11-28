using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.ModelsConfigurations {
    public class BurgerConfiguration : IEntityTypeConfiguration<Burger> {
        public void Configure(EntityTypeBuilder<Burger> builder) {
            builder.ToTable("burgers");
            builder.Property(b => b.Id).HasColumnName("id");
            builder.Property(b => b.IsCustom).HasColumnName("custom");
            builder.Property(b => b.Name).HasColumnName("name");
            builder.Property(b => b.Description).HasColumnName("description");
            //builder.Property(b => b.UserId).HasColumnName("user_id");
            builder.HasKey(b => b.Id);
        }
    }
}
