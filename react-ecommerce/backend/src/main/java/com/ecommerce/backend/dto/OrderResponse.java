package com.ecommerce.backend.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

// Response shape expected by the frontend Orders page:
// { id, items: [{productId,title,price,quantity,image}], totalAmount, status, createdAt }
public record OrderResponse(
        Long id,
        List<OrderItemRequest> items,
        BigDecimal totalAmount,
        String status,
        Instant createdAt) {
}
