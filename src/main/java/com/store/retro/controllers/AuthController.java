package com.store.retro.controllers;

import com.store.retro.models.dtos.AuthDTOs;
import com.store.retro.models.entities.UserEntity;
import com.store.retro.repositories.UserRepository;
import com.store.retro.services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody AuthDTOs.RegisterRequest registerRequest) {
        UserEntity user = UserEntity.builder()
                .email(registerRequest.email())
                .password(passwordEncoder.encode(registerRequest.password()))
                .build();
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "User registered successfully"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthDTOs.LoginRequest request, HttpServletResponse response) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );

            String token = jwtService.generateToken(auth);

            ResponseCookie cookie = ResponseCookie.from("AUTH", token)
                    .httpOnly(true)
                    .sameSite("Lax")
                    .path("/")
                    .build();

            response.addHeader("Set-Cookie", cookie.toString());

            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("AUTH", "")
                .httpOnly(true)
                .sameSite("Lax")
                .maxAge(0)
                .path("/")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }


    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CookieValue(value = "AUTH", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        try {
            String userId = jwtService.extractUserIdFromToken(token);
            return userRepository.findByEmail(userId)
                    .map(user -> ResponseEntity.ok(Map.of(
                            "email", user.getEmail()
                    )))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("error", "User not found")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid token"));
        }
    }

    @GetMapping("/user/exists")
    public ResponseEntity<Boolean> userExists(@RequestParam String email) {
        return ResponseEntity.ok(
                userRepository.existsByEmail(email)
        );
    }
}

