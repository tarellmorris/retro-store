package com.store.retro.controllers;

import com.store.retro.models.dtos.CartDTOs.AddCartItemRequest;
import com.store.retro.models.dtos.CartDTOs.CartResponse;
import com.store.retro.models.dtos.CartDTOs.UpdateCartItemRequest;
import com.store.retro.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public CartResponse getActiveCart(
            @AuthenticationPrincipal Integer userId
    ) {
        return cartService.getOrCreateActiveCart(userId);
    }

    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public CartResponse addItem(
            @AuthenticationPrincipal Integer userId,
            @RequestBody AddCartItemRequest request
    ) {
        return cartService.addItem(userId, request);
    }

    @PutMapping("/items/{gameId}")
    public CartResponse updateItemQuantity(
            @AuthenticationPrincipal Integer userId,
            @PathVariable Integer gameId,
            @RequestBody UpdateCartItemRequest request
    ) {
        return cartService.updateItemQuantity(userId, gameId, request);
    }

    @DeleteMapping("/items/{gameId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeItem(
            @AuthenticationPrincipal Integer userId,
            @PathVariable Integer gameId
    ) {
        cartService.removeItem(userId, gameId);
    }

    @PostMapping("/checkout")
    public CartResponse checkout(
            @AuthenticationPrincipal Integer userId
    ) {
        return cartService.checkout(userId);
    }
}
