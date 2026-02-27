package com.store.retro.services;


import org.springframework.security.core.Authentication;

public interface JwtService {
    String generateToken(Authentication userId);

    String extractEmailFromToken(String token);
}
