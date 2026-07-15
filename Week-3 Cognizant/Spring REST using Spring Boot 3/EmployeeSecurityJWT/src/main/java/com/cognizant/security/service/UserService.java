package com.cognizant.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cognizant.security.config.JwtService;
import com.cognizant.security.dto.LoginRequest;
import com.cognizant.security.dto.LoginResponse;
import com.cognizant.security.dto.RegisterRequest;
import com.cognizant.security.entity.Role;
import com.cognizant.security.entity.User;
import com.cognizant.security.repository.UserRepository;

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

    // Register User
    public User register(RegisterRequest request) {

        if (repository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setUsername(request.getUsername());

        // Encrypt Password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // First user becomes ADMIN
        if (repository.count() == 0) {
            user.setRole(Role.ROLE_ADMIN);
        } else {
            user.setRole(Role.ROLE_USER);
        }

        return repository.save(user);
    }

    // Login User
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        String token = jwtService.generateToken(request.getUsername());

        return new LoginResponse(token);
    }
}