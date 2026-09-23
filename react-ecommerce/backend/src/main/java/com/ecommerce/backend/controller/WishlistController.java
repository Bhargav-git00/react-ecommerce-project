package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.WishlistItemRequest;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.service.WishlistService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public List<WishlistItemRequest> myWishlist(@AuthenticationPrincipal User user) {
        return wishlistService.myWishlist(user);
    }

    @PostMapping
    public ResponseEntity<WishlistItemRequest> add(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody WishlistItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(wishlistService.add(user, request));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> remove(
            @AuthenticationPrincipal User user,
            @PathVariable Long productId) {
        wishlistService.remove(user, productId);
        return ResponseEntity.noContent().build();
    }
}
