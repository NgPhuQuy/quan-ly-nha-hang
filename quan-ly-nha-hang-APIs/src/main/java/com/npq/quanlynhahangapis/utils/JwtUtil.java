package com.npq.quanlynhahangapis.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
@Slf4j
public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String taoToken(Integer maNguoiDung, String taiKhoan, String vaiTro) {
        return Jwts.builder()
                .subject(taiKhoan)
                .claim("maNguoiDung", maNguoiDung)
                .claim("vaiTro", vaiTro)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey())
                .compact();
    }

    public String layTKTuToken(String token) {
        return layClaim(token, Claims::getSubject);
    }

    public Integer layMaNDTuToken(String token) {
        Claims claims = layTatCaClaim(token);
        return claims.get("maNguoiDung", Integer.class);
    }

    public String layVaiTroTuToken(String token) {
        Claims claims = layTatCaClaim(token);
        return claims.get("vaiTro", String.class);
    }

    private <T> T layClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = layTatCaClaim(token);
        return claimsResolver.apply(claims);
    }

    private Claims layTatCaClaim(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean tokenHopLe(String token) {
        try {
            Claims claims = layTatCaClaim(token);
            return claims.getExpiration().after(new Date());
        } catch (ExpiredJwtException e) {
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String layTaiKhoanTuToken(String token) {
        Claims claims = layTatCaClaim(token);
        return claims.getSubject();
    }
}
