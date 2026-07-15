package com.cognizant.springlearn.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Secret key (minimum 32 characters for HS256)
    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey123";

    // Expiry time (10 hours)
    private static final long EXPIRATION = 1000 * 60 * 60 * 10;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(
                SECRET.getBytes(StandardCharsets.UTF_8));
    }

    // Generate JWT Token
    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract Username
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Extract Expiration
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // Extract Claims
    public Claims extractClaims(String token) {

        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Check Expired
    public boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());

    }

    // Validate Token
    public boolean validateToken(String token,
                                 String username) {

        return username.equals(extractUsername(token))
                && !isTokenExpired(token);

    }

}