package com.store.retro.services.implimentations;

import com.store.retro.models.dtos.CartDTOs.AddCartItemRequest;
import com.store.retro.models.dtos.CartDTOs.CartResponse;
import com.store.retro.models.dtos.CartDTOs.UpdateCartItemRequest;
import com.store.retro.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    @Override
    public CartResponse getOrCreateActiveCart(Integer userId) {
        // TODO: fetch or create ACTIVE cart
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public CartResponse addItem(Integer userId, AddCartItemRequest request) {
        // TODO: validate stock, snapshot price, upsert cart_item
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public CartResponse updateItemQuantity(
            Integer userId,
            Integer gameId,
            UpdateCartItemRequest request
    ) {
        // TODO: enforce quantity > 0, stock checks
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public void removeItem(Integer userId, Integer gameId) {
        // TODO: remove item from cart
    }

    @Override
    public CartResponse checkout(Integer userId) {
        // TODO: finalize cart, decrement inventory, mark CHECKED_OUT
        throw new UnsupportedOperationException("Not implemented yet");
    }
}
