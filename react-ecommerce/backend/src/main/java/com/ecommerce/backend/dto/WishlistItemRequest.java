package com.ecommerce.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

// POST /api/wishlist body - product snapshot, same shape the frontend reads back
public record WishlistItemRequest(
        @NotNull(message = "productId is required")
        Long productId,

        @NotBlank(message = "title is required")
        String title,

        @NotNull(message = "price is required")
        @DecimalMin(value = "0", message = "price must be >= 0")
        BigDecimal price,

        String image,

        String category) {
}
