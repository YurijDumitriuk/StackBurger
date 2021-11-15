using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.ModelsConfigurations {
    public class UserConfiguration : IEntityTypeConfiguration<User>{
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.ToTable("users");
            builder.Property(u => u.Id).HasColumnName("id");
            builder.Property(u => u.Name).HasColumnName("name");
            builder.Property(u => u.Password).HasColumnName("password");
            builder.Property(u => u.Phone).HasColumnName("phone");
            builder.Property(u => u.Address).HasColumnName("address");
            builder.HasKey(u => u.Id);
        }
    }
}
