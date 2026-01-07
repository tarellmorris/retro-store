package com.store.retro.model.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public class CartDTOs {
    public record AddCartItemRequest(
            @NotNull Integer gameId,
            @Min(1) Integer quantity
    ) {
    }

    public record UpdateCartItemRequest(
            @Min(1) Integer quantity
    ) {
    }

    public record CartResponse(
            Integer cartId,
            String status,
            List<CartItemResponse> items,
            int totalItems,
            BigDecimal subtotal
    ) {
    }

    public record CartItemResponse(
            Integer gameId,
            String gameName,
            Integer quantity,
            BigDecimal priceAtAdd,
            BigDecimal lineTotal
    ) {
    }
}

