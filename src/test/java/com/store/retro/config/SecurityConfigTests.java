package com.store.retro.config;

import com.store.retro.models.entities.UserEntity;
import com.store.retro.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class SecurityTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void userExistsShouldBeAccessibleWithoutAuth() throws Exception {
        mvc.perform(get("/api/auth/user/exists")
                        .param("email", "test@test.com"))
                .andExpect(status().isOk());
    }

    @Test
    void gamesShouldBeAccessibleWithoutAuth() throws Exception {
        mvc.perform(get("/api/games"))
                .andExpect(status().isOk());
    }

    @Test
    void cartShouldRequireAuth() throws Exception {
        mvc.perform(get("/api/cart"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void meShouldRequireAuth() throws Exception {
        mvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void meShouldReturnAuthenticatedUser() throws Exception {
        UserEntity user = userRepository.save(UserEntity.builder()
                .email("user-" + UUID.randomUUID() + "@test.com")
                .password("password")
                .build());

        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getId(),
                null,
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        mvc.perform(get("/api/auth/me").with(authentication(auth)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(user.getId().toString())))
                .andExpect(jsonPath("$.email", is(user.getEmail())));
    }
}
