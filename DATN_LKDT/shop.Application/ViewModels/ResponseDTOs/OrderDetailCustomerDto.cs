﻿using shop.Domain.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Application.ViewModels.ResponseDTOs
{
    public class OrderDetailCustomerDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string InvoiceCode { get; set; } = string.Empty;
        public string PaymentMethodName { get; set; } = string.Empty;
        public int DiscountValue { get; set; } = 0;
        public OrderState State { get; set; }
        public DateTime OrderCreatedAt { get; set; }
        public bool IsCounterOrder { get; set; }
    }
}
