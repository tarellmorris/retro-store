package com.store.retro.services.implimentations.mappers;

import com.store.retro.model.dtos.CartDTOs.CartItemResponse;
import com.store.retro.model.dtos.CartDTOs.CartResponse;
import com.store.retro.model.entities.CartEntity;
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
                        item.getGame().getId(),
                        item.getGame().getName(),
                        item.getQuantity(),
                        item.getPriceAtAdd(),
                        item.getPriceAtAdd()
                                .multiply(BigDecimal.valueOf(item.getQuantity()))
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
