package com.ecommerce.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

// One cart line sent by the frontend at checkout
public record OrderItemRequest(
        @NotNull(message = "productId is required")
        Long productId,

        @NotBlank(message = "title is required")
        String title,

        @NotNull(message = "price is required")
        @DecimalMin(value = "0", message = "price must be >= 0")
        BigDecimal price,

        @NotNull(message = "quantity is required")
        @Min(value = 1, message = "quantity must be at least 1")
        Integer quantity,

        String image) {
}
