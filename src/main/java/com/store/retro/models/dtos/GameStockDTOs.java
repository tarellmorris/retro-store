package com.store.retro.models.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class GameStockDTOs {
    public record GameStockResponse(
            Integer id,
            String name,
            String platform,
            String description,
            String longDescription,
            String image,
            BigDecimal price,
            Integer quantity,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
    }
}
