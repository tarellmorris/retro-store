package com.store.retro.repositories;

import com.store.retro.models.entities.StockDataGameEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StockDataGameRepository
        extends JpaRepository<StockDataGameEntity, Integer> {
}