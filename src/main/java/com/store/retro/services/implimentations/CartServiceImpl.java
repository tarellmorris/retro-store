package com.store.retro.services.implimentations;

import com.store.retro.model.dtos.CartDTOs.AddCartItemRequest;
import com.store.retro.model.dtos.CartDTOs.CartResponse;
import com.store.retro.model.dtos.CartDTOs.UpdateCartItemRequest;
import com.store.retro.model.entities.CartEntity;
import com.store.retro.model.entities.CartItemEntity;
import com.store.retro.model.entities.GamesStockEntity;
import com.store.retro.model.entities.helpers.CartStatus;
import com.store.retro.repositories.CartItemRepository;
import com.store.retro.repositories.CartRepository;
import com.store.retro.services.CartService;
import com.store.retro.services.implimentations.helpers.CartServiceHelpers;
import com.store.retro.services.implimentations.mappers.CartServiceMappers;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CartServiceHelpers cartServiceHelpers;
    private final CartServiceMappers cartServiceMappers;

    @Override
    public CartResponse getOrCreateActiveCart(Integer userId) {
        CartEntity cart = cartRepository
                .findByUserIdAndStatus(userId, CartStatus.ACTIVE)
                .orElseGet(() -> cartServiceHelpers.createCart(userId));

        return cartServiceMappers.toResponse(cart);
    }

    @Override
    public CartResponse addItem(Integer userId, @NonNull AddCartItemRequest request) {
        CartEntity cart = cartServiceHelpers.getActiveCart(userId);
        GamesStockEntity game = cartServiceHelpers.getGame(request.gameId());

        cartServiceHelpers.validateStock(game, request.quantity());

        CartItemEntity item = cartItemRepository
                .findByCartIdAndGameId(cart.getId(), game.getId())
                .orElse(null);

        if (item == null) {
            cartServiceHelpers.enforceCartSize(cart);

            item = CartItemEntity.builder()
                    .cart(cart)
                    .game(game)
                    .quantity(request.quantity())
                    .priceAtAdd(game.getPrice())
                    .build();

            cart.getItems().add(item);
        } else {
            int newQuantity = item.getQuantity() + request.quantity();
            cartServiceHelpers.validateStock(game, newQuantity);
            item.setQuantity(newQuantity);
        }

        return cartServiceMappers.toResponse(cart);
    }

    @Override
    public CartResponse updateItemQuantity(
            Integer userId,
            Integer gameId,
            @NonNull UpdateCartItemRequest request
    ) {
        CartEntity cart = cartServiceHelpers.getActiveCart(userId);
        CartItemEntity item = cartServiceHelpers.getCartItem(cart, gameId);

        cartServiceHelpers.validateStock(item.getGame(), request.quantity());
        item.setQuantity(request.quantity());

        return cartServiceMappers.toResponse(cart);
    }

    @Override
    public void removeItem(Integer userId, Integer gameId) {
        CartEntity cart = cartServiceHelpers.getActiveCart(userId);
        cartItemRepository.deleteByCartIdAndGameId(cart.getId(), gameId);
    }

    @Override
    public CartResponse checkout(Integer userId) {
        CartEntity cart = cartServiceHelpers.getActiveCart(userId);

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot checkout empty cart");
        }

        // Decrement inventory
        for (CartItemEntity item : cart.getItems()) {
            GamesStockEntity game = item.getGame();

            cartServiceHelpers.validateStock(game, item.getQuantity());
            game.setQuantity(game.getQuantity() - item.getQuantity());
        }

        cart.setStatus(CartStatus.CHECKED_OUT);

        return cartServiceMappers.toResponse(cart);
    }

}
