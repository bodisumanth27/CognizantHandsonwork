package com.cognizant.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cognizant.ecommerce.dto.LoginRequest;
import com.cognizant.ecommerce.dto.LoginResponse;
import com.cognizant.ecommerce.dto.RegisterRequest;
import com.cognizant.ecommerce.entity.Role;
import com.cognizant.ecommerce.entity.User;
import com.cognizant.ecommerce.repository.UserRepository;
import com.cognizant.ecommerce.security.JwtService;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    // Register
    public User register(RegisterRequest request) {

        if (repository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // First registered user becomes ADMIN
        if (repository.count() == 0) {
            user.setRole(Role.ROLE_ADMIN);
        } else {
            user.setRole(Role.ROLE_CUSTOMER);
        }

        return repository.save(user);
    }

    // Login
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        String token = jwtService.generateToken(request.getUsername());

        return new LoginResponse(token);
    }

}