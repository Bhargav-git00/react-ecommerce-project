package com.ecommerce.backend.dto;

// Response shape expected by the frontend:
// { "token": "...", "user": { "id": 1, "name": "...", "email": "..." } }
public record AuthResponse(String token, UserResponse user) {
}
