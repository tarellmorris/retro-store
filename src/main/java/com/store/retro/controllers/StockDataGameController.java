package com.store.retro.controllers;

import com.store.retro.models.entities.StockDataGameEntity;
import com.store.retro.services.StockDataGameService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class StockDataGameController {

    private final StockDataGameService service;

    @GetMapping
    public Page<StockDataGameEntity> listGames(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction
    ) {
        return service.getGames(page, size, sortBy, direction);
    }

    @GetMapping("/platform/{platform}")
    public Page<StockDataGameEntity> listByPlatform(
            @PathVariable String platform,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction
    ) {
        return service.getGamesByPlatform(
                platform, page, size, sortBy, direction
        );
    }
}
