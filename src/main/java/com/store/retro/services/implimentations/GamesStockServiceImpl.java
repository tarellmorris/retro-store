package com.store.retro.services.implimentations;

import com.store.retro.model.entities.GamesStockEntity;
import com.store.retro.repositories.GamesStockRepository;
import com.store.retro.services.GamesStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GamesStockServiceImpl implements GamesStockService {
    private final GamesStockRepository repository;

    @Override
    public Page<GamesStockEntity> getGames(
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

        return repository.findAll(pageable);
    }
}
