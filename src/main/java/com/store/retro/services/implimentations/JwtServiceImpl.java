package com.store.retro.services.implimentations;

import com.store.retro.services.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {
    private static final String JWT_SECRET = "jwt-secret";
    private static final long EXPIRATION_MS = 864_000_000;

    public String generateToken(Authentication userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(SignatureAlgorithm.HS256, Keys.hmacShaKeyFor(JWT_SECRET.getBytes()))
                .compact();
    }

    public Integer extractUserIdFromToken(String token) {
        return Integer.valueOf(
                Jwts.parser()
                        .setSigningKey(JWT_SECRET.getBytes())
                        .build()
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject()
        );
    }
}
