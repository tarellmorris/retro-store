package com.store.retro.services;

import com.store.retro.models.entities.StockDataGameEntity;
import com.store.retro.repositories.StockDataGameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class StockDataGameService {

    private final StockDataGameRepository repository;

    public Page<StockDataGameEntity> getGames(
            int page,
            int size,
            String sortBy,
            Sort.Direction direction
    ) {
        size = Math.min(size, 50);

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(direction, sortBy)
        );

        return repository.listAll(pageable);
    }

    public Page<StockDataGameEntity> getGamesByPlatform(
            String platform,
            int page,
            int size,
            String sortBy,
            Sort.Direction direction
    ) {
        size = Math.min(size, 50);

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(direction, sortBy)
        );

        return repository.findByPlatform(platform, pageable);
    }
}

