package com.store.retro.repositories;

import com.store.retro.models.entities.GamesStockEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GamesStockRepository
        extends JpaRepository<GamesStockEntity, Integer> {
}