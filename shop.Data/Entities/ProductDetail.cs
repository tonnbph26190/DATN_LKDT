﻿namespace shop.Data.Entities;
public class ProductDetail
{
    public Guid Id { get; set; }
    public int Stock { get; set; }
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public DateTime CreatedDate { get; set; }
    public int Status { get; set; }

    // relationship
    public Guid ProductId { get; set; }
    public Guid ColorId { get; set; }
    public Guid SizeId { get; set; }
    public Guid PromotionId { get; set; }
    public virtual Product Product { get; set; }
    public virtual Color Color { get; set; }
    public virtual Size Size { get; set; }
    public virtual Promotion Promotion { get; set; }
    public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    public virtual ICollection<CartDetail> CartDetails { get; set; }
}
