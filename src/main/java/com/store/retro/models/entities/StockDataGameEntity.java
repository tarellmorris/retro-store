package com.store.retro.models.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "stock_data_games",
        indexes = {
                @Index(name = "idx_game_name", columnList = "name"),
                @Index(name = "idx_game_platform", columnList = "platform"),
                @Index(name = "idx_game_price", columnList = "price"),
                @Index(name = "idx_game_created_at", columnList = "created_at")
        }
)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StockDataGameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 50)
    private String platform;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String longDescription;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(length = 30)
    private String image;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
}
