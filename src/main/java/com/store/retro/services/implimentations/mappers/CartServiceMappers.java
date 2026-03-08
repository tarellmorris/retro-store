package com.store.retro.services.implimentations.mappers;

import com.store.retro.models.dtos.CartDTOs.CartItemResponse;
import com.store.retro.models.dtos.CartDTOs.CartResponse;
import com.store.retro.models.dtos.GameStockDTOs;
import com.store.retro.models.entities.CartEntity;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CartServiceMappers {
    public CartResponse toResponse(@NonNull CartEntity cart) {
        List<CartItemResponse> items = cart.getItems().stream()
                .map(item -> new CartItemResponse(
                        item.getId(),
                        item.getQuantity(),
                        item.getPriceAtAdd(),
                        item.getPriceAtAdd()
                                .multiply(BigDecimal.valueOf(item.getQuantity())),
                        new GameStockDTOs.GameStockResponse(
                                item.getGame().getId(),
                                item.getGame().getName(),
                                item.getGame().getPlatform(),
                                item.getGame().getDescription(),
                                item.getGame().getLongDescription(),
                                item.getGame().getImage(),
                                item.getGame().getPrice(),
                                item.getGame().getQuantity(),
                                item.getGame().getCreatedAt(),
                                item.getGame().getUpdatedAt()
                        )
                ))
                .toList();

        int totalItems = items.stream()
                .mapToInt(CartItemResponse::quantity)
                .sum();

        BigDecimal subtotal = items.stream()
                .map(CartItemResponse::lineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartResponse(
                cart.getId(),
                cart.getStatus().name(),
                items,
                totalItems,
                subtotal
        );
    }
}
