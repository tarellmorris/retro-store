package com.store.retro.repositories;

import com.store.retro.models.entities.CartEntity;
import com.store.retro.models.entities.CartStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository
        extends JpaRepository<CartEntity, Integer> {

    Optional<CartEntity> findByUserIdAndStatus(
            Integer userId,
            CartStatus status
    );
}