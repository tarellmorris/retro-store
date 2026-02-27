package com.store.retro.utils;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieTools {
    public ResponseCookie createAuthCookie(String token) {
        return ResponseCookie.from("AUTH", token)
                .httpOnly(true)
                .sameSite("Lax")
                .path("/")
                .build();
    }

    public ResponseCookie deleteAuthCookie() {
        return ResponseCookie.from("AUTH", "")
                .httpOnly(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
    }
}
