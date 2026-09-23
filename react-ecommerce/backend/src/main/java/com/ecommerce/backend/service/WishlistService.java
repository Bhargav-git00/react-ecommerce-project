package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.WishlistItemRequest;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.entity.WishlistItem;
import com.ecommerce.backend.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    @Transactional(readOnly = true)
    public List<WishlistItemRequest> myWishlist(User user) {
        return wishlistRepository.findByUserOrderByProductIdAsc(user).stream()
                .map(item -> new WishlistItemRequest(
                        item.getProductId(),
                        item.getTitle(),
                        item.getPrice(),
                        item.getImage(),
                        item.getCategory()))
                .toList();
    }

    @Transactional
    public WishlistItemRequest add(User user, WishlistItemRequest request) {

        // Idempotent: adding an already-wishlisted product just returns it
        WishlistItem existing = wishlistRepository
                .findByUserAndProductId(user, request.productId())
                .orElse(null);

        if (existing != null) {
            return toRequest(existing);
        }

        WishlistItem saved = wishlistRepository.save(new WishlistItem(
                user,
                request.productId(),
                request.title(),
                request.price(),
                request.image(),
                request.category()));

        return toRequest(saved);
    }

    @Transactional
    public void remove(User user, Long productId) {
        // Idempotent delete - removing something absent is not an error
        wishlistRepository.deleteByUserAndProductId(user, productId);
    }

    private WishlistItemRequest toRequest(WishlistItem item) {
        return new WishlistItemRequest(
                item.getProductId(),
                item.getTitle(),
                item.getPrice(),
                item.getImage(),
                item.getCategory());
    }
}
