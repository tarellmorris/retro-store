package com.store.retro.services;


import org.springframework.security.core.Authentication;

public interface JwtService {
    String generateToken(Authentication userId);

    Integer extractUserIdFromToken(String token);
}
