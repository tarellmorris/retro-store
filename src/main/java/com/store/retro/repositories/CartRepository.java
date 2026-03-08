package com.store.retro.repositories;

import com.store.retro.models.entities.CartEntity;
import com.store.retro.models.entities.helpers.CartStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartRepository
        extends JpaRepository<CartEntity, Integer> {

    @Query("""
                SELECT DISTINCT c
                FROM CartEntity c
                LEFT JOIN FETCH c.items i
                LEFT JOIN FETCH i.game
                WHERE c.userId = :userId
                AND c.status = :status
            """)
    Optional<CartEntity> findByUserIdAndStatus(
            Integer userId,
            CartStatus status
    );
}