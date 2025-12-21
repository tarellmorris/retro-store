package com.store.retro.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class RESTController {

    @RequestMapping("/")
    public String index() {
        return "Hello World!!!!";
    }
}
