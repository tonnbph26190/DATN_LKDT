﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using shop.Domain.Entities;

namespace AppData.Configuration
{
    public class AccountConfiguration : IEntityTypeConfiguration<AccountEntity>
    {
        public void Configure(EntityTypeBuilder<AccountEntity> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(a => a.Carts)
            .WithOne(c => c.Accounts)
            .HasForeignKey<CartEntity>(c => c.Id);
        }
    }
}
