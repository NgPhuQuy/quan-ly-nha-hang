package com.npq.quanlynhahangapis.utils;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;

public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey(){
        return Keys
    }
}
