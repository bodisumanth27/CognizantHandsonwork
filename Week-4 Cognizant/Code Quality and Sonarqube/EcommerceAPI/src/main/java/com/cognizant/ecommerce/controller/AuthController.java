package com.cognizant.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cognizant.ecommerce.dto.LoginRequest;
import com.cognizant.ecommerce.dto.LoginResponse;
import com.cognizant.ecommerce.dto.RegisterRequest;
import com.cognizant.ecommerce.entity.User;
import com.cognizant.ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@Valid @RequestBody RegisterRequest request) {

        return service.register(request);

    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        return service.login(request);

    }

}