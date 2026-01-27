package com.store.retro.services;

import com.store.retro.models.dtos.CartDTOs.AddCartItemRequest;
import com.store.retro.models.dtos.CartDTOs.CartResponse;
import com.store.retro.models.dtos.CartDTOs.UpdateCartItemRequest;
import org.springframework.stereotype.Service;

@Service
public interface CartService {

    CartResponse getOrCreateActiveCart(Integer userId);

    CartResponse addItem(Integer userId, AddCartItemRequest request);

    CartResponse updateItemQuantity(Integer userId, Integer gameId, UpdateCartItemRequest request);

    void removeItem(Integer userId, Integer gameId);

    CartResponse checkout(Integer userId);
}
