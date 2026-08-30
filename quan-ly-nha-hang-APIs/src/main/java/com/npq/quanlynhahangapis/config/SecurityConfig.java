package com.npq.quanlynhahangapis.config;

import com.npq.quanlynhahangapis.filter.JwtFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(customAuthenticationEntryPoint())
                        .accessDeniedHandler(customAccessDeniedHandler())
                )
                .authorizeHttpRequests(auth -> auth
                        // Preflight request
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Auth & User Registration Public
                        .requestMatchers(HttpMethod.POST, "/auth/login", "/users").permitAll()

                        // Public read-only endpoints (Landing page & booking)
                        .requestMatchers(HttpMethod.GET, "/chi-nhanh/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/mat-hang/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/dat-lich/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/dat-lich").permitAll()
                        .requestMatchers(HttpMethod.GET, "/khuyen-mai/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/ban/**").permitAll()

                        // Authenticated endpoints for all logged in users (KhachHang, NhanVien, QuanLy, Admin)
                        .requestMatchers("/auth/me", "/auth/logout").authenticated()

                        // Staff / Manager / Admin only (POS & Operations)
                        .requestMatchers("/hoa-don/**").hasAnyRole("ADMIN", "QUANLY", "NHANVIEN")
                        .requestMatchers("/thu-chi/**").hasAnyRole("ADMIN", "QUANLY", "NHANVIEN")
                        .requestMatchers("/dashboard/**").hasAnyRole("ADMIN", "QUANLY", "NHANVIEN")
                        .requestMatchers(HttpMethod.PATCH, "/dat-lich/**").hasAnyRole("ADMIN", "QUANLY", "NHANVIEN")
                        .requestMatchers(HttpMethod.DELETE, "/dat-lich/**").hasAnyRole("ADMIN", "QUANLY", "NHANVIEN")
                        .requestMatchers(HttpMethod.POST, "/ban/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PUT, "/ban/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PATCH, "/ban/**").hasAnyRole("ADMIN", "QUANLY", "NHANVIEN")
                        .requestMatchers(HttpMethod.DELETE, "/ban/**").hasRole("ADMIN")

                        // Manager & Admin (Promotions, Branches, Foods management)
                        .requestMatchers(HttpMethod.POST, "/khuyen-mai/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PUT, "/khuyen-mai/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PATCH, "/khuyen-mai/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.DELETE, "/khuyen-mai/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/mat-hang/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PUT, "/mat-hang/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.DELETE, "/mat-hang/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/chi-nhanh/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/chi-nhanh/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PATCH, "/chi-nhanh/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/chi-nhanh/**").hasRole("ADMIN")

                        // User & Customer Management
                        .requestMatchers(HttpMethod.GET, "/users/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PUT, "/users/**").hasAnyRole("ADMIN", "QUANLY")
                        .requestMatchers(HttpMethod.PATCH, "/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")
                        .requestMatchers("/khach-hang/**").hasAnyRole("ADMIN", "QUANLY", "NHANVIEN")

                        // All other requests require authentication
                        .anyRequest().authenticated()
                ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationEntryPoint customAuthenticationEntryPoint() {
        return (request, response, authException) -> {
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"status\":401,\"error\":\"UNAUTHORIZED\",\"message\":\"Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn!\",\"timestamp\":\"" + LocalDateTime.now() + "\"}");
        };
    }

    @Bean
    public AccessDeniedHandler customAccessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"status\":403,\"error\":\"FORBIDDEN\",\"message\":\"Bạn không có quyền thực hiện thao tác này!\",\"timestamp\":\"" + LocalDateTime.now() + "\"}");
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:5174"
        ));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setExposedHeaders(List.of("Authorization"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}