package com.store.retro.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RESTController {

    @GetMapping("/")
    public String index() {
        return "Hello World from the backend";
    }
}
