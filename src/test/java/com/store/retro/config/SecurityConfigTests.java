package com.store.retro.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class SecurityTests {

    @Autowired
    private MockMvc mvc;

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
}
