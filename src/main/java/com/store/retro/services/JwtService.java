package com.store.retro.services;


public interface JwtService {
    String generateToken(Integer userId);

    Integer extractUserIdFromToken(String token);
}
