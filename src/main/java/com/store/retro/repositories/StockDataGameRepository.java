package com.store.retro.repositories;

import com.store.retro.models.entities.StockDataGameEntity;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StockDataGameRepository
        extends JpaRepository<StockDataGameEntity, Integer> {

    Page<StockDataGameEntity> listAll(@NonNull Pageable pageable);

    Page<StockDataGameEntity> findByPlatform(
            String platform,
            Pageable pageable
    );
}