package com.store.retro.services.implimentations.helpers;

import com.store.retro.model.entities.CartEntity;
import com.store.retro.model.entities.CartItemEntity;
import com.store.retro.model.entities.GamesStockEntity;
import com.store.retro.model.entities.helpers.CartStatus;
import com.store.retro.repositories.CartItemRepository;
import com.store.retro.repositories.CartRepository;
import com.store.retro.repositories.GamesStockRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartServiceHelpers {
    private static final int MAX_ITEMS_PER_CART = 50;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final GamesStockRepository gamesStockRepository;

    public CartEntity createCart(Integer userId) {
        CartEntity cart = CartEntity.builder()
                .userId(userId)
                .status(CartStatus.ACTIVE)
                .build();

        return cartRepository.save(cart);
    }

    public CartEntity getActiveCart(Integer userId) {
        return cartRepository
                .findByUserIdAndStatus(userId, CartStatus.ACTIVE)
                .orElseThrow(() -> new IllegalStateException("Active cart not found"));
    }

    public GamesStockEntity getGame(Integer gameId) {
        return gamesStockRepository.findById(gameId)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
    }

    public CartItemEntity getCartItem(@NonNull CartEntity cart, Integer gameId) {
        return cartItemRepository
                .findByCartIdAndGameId(cart.getId(), gameId)
                .orElseThrow(() -> new IllegalArgumentException("Item not in cart"));
    }

    public void validateStock(@NonNull GamesStockEntity game, int requestedQuantity) {
        if (requestedQuantity > game.getQuantity()) {
            throw new IllegalStateException(
                    "Insufficient stock for game: " + game.getName()
            );
        }
    }

    public void enforceCartSize(@NonNull CartEntity cart) {
        if (cart.getItems().size() >= MAX_ITEMS_PER_CART) {
            throw new IllegalStateException("Cart item limit exceeded");
        }
    }
}
