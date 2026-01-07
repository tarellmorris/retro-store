package com.store.retro.repositories;

import com.store.retro.model.entities.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository
        extends JpaRepository<CartItemEntity, Integer> {

    Optional<CartItemEntity> findByCartIdAndGameId(
            Integer cartId,
            Integer gameId
    );

    void deleteByCartIdAndGameId(
            Integer cartId,
            Integer gameId
    );
}