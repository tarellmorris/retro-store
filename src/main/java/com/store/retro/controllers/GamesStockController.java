package com.store.retro.controllers;

import com.store.retro.models.entities.GamesStockEntity;
import com.store.retro.services.GamesStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GamesStockController {

    private final GamesStockService service;

    @GetMapping
    public Page<GamesStockEntity> listGames(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction
    ) {
        return service.getGames(page, size, sortBy, direction);
    }
}
