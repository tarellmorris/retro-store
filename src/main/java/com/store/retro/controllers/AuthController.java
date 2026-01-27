package com.store.retro.controllers;

import com.store.retro.models.dtos.AuthDTOs;
import com.store.retro.models.entities.UserEntity;
import com.store.retro.repositories.UserRepository;
import com.store.retro.services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public void register(@RequestBody AuthDTOs.RegisterRequest registerRequest) {
        UserEntity user = UserEntity.builder()
                .email(registerRequest.email())
                .password(registerRequest.password())
                .build();
        userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(
            @RequestBody AuthDTOs.LoginRequest request,
            HttpServletResponse response
    ) {
        UserEntity user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getId());

        ResponseCookie cookie = ResponseCookie.from("AUTH", token)
                .httpOnly(true)
                .secure(false) // true in prod
                .path("/")
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok().build();
    }
}

