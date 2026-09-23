package com.ecommerce.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

// POST /api/orders request + GET /api/orders response item
public record OrderRequest(
        @NotNull(message = "items are required")
        @Valid
        List<OrderItemRequest> items,

        // Server recomputes this from items - value from client is ignored
        BigDecimal totalAmount) {

    // Response-only fields (createdAt, status, id) are handled by OrderResponse
    public static OrderResponse toResponse(Long id, List<OrderItemRequest> items,
                                           BigDecimal totalAmount, String status,
                                           Instant createdAt) {
        return new OrderResponse(id, items, totalAmount, status, createdAt);
    }
}
