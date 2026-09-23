package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {

    List<WishlistItem> findByUserOrderByProductIdAsc(User user);

    Optional<WishlistItem> findByUserAndProductId(User user, Long productId);

    void deleteByUserAndProductId(User user, Long productId);
}
