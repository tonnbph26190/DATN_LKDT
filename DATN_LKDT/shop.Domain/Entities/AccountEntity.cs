﻿using AppData.Enum;
using shop.Domain.Entities.Base;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Text.Json.Serialization;

namespace shop.Domain.Entities
{
    public class AccountEntity : BaseEntity
    {
        public Guid Id { get; set; }
        [StringLength(100, MinimumLength = 6)]
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool IsActive { get; set; } = true;
        public bool Deleted { get; set; } = false;
        public Guid RoleId { get; set; }
        public RoleEntity? Role { get; set; }
        [JsonIgnore]
        public CartEntity? Cart { get; set; }
        public List<AddressEntity>? Addresses { get; set; }
        [JsonIgnore]
        public List<Order>? Orders { get; set; }
    }
}
