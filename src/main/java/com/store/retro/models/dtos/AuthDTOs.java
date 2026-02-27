package com.store.retro.models.dtos;

public class AuthDTOs {
    public record RegisterRequest(String email, String password) {
    }

    public record LoginRequest(String email, String password) {
    }

    public record Username(String email) {
    }
}
