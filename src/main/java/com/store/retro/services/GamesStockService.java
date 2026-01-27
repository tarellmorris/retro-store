package com.store.retro.services;

import com.store.retro.models.entities.GamesStockEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface GamesStockService {

    Page<GamesStockEntity> getGames(
            int page,
            int size,
            String sortBy,
            Sort.Direction direction
    );
}