﻿namespace shop.Data.Entities;
public class Staff
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Gender { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string PasswordHash { get; set; }
    public int Status { get; set; }

    // relationship
    public Guid RoleId { get; set; }
    public virtual Role Role { get; set; }
    public virtual ICollection<Order> Orders { get; set; }
}
