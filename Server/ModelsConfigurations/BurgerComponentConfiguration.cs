using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.ModelsConfigurations {
    public class BurgerComponentConfiguration : IEntityTypeConfiguration<BurgerComponent> {
        public void Configure(EntityTypeBuilder<BurgerComponent> builder) {
            builder.ToTable("burgers_components");
            builder.Property(bc => bc.Id).HasColumnName("id");
            builder.Property(bc => bc.SerialNumber).HasColumnName("serial_number");
            builder.Property(bc => bc.ComponentId).HasColumnName("component_id");
            builder.Property(bc => bc.BurgerId).HasColumnName("burger_id");
            builder.HasKey(bc => bc.Id);
        }
    }
}
