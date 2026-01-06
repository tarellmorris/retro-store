package com.store.retro.services;

import com.store.retro.models.entities.StockDataGameEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface StockDataGameService {

    Page<StockDataGameEntity> getGames(
            int page,
            int size,
            String sortBy,
            Sort.Direction direction
    );
}