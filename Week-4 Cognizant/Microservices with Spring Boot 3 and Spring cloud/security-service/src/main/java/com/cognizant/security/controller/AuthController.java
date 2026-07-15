package com.cognizant.security.controller;

import org.springframework.web.bind.annotation.*;

import com.cognizant.security.dto.AuthRequest;
import com.cognizant.security.dto.AuthResponse;
import com.cognizant.security.jwt.JwtUtil;

@RestController
public class AuthController {

    @PostMapping("/authenticate")
    public AuthResponse authenticate(
            @RequestBody AuthRequest request) {

        if(request.getUsername().equals("admin")
                && request.getPassword().equals("admin")) {

            return new AuthResponse(
                    JwtUtil.generateToken(request.getUsername()));

        }

        throw new RuntimeException("Invalid Credentials");

    }

}