package com.web.lab4_back.service.impl;

import com.web.lab4_back.exception.InvalidTokenException;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.service.TokenService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Stateless
public class TokenServiceImpl implements TokenService {

    @Inject
    @ConfigProperty(name = "jwt.secret.key")
    private String secretKey;

    @Inject
    @ConfigProperty(name = "jwt.access.token.expiration")
    private long accessTokenExpirationTime;

    @Inject
    @ConfigProperty(name = "jwt.refresh.token.expiration")
    private long refreshTokenExpirationTime;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Long userId) {
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpirationTime))
                .signWith(getSecretKey(), Jwts.SIG.HS512)
                .compact();
    }

    public String generateRefreshToken(Long userId) {
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshTokenExpirationTime))
                .signWith(getSecretKey(), Jwts.SIG.HS512)
                .compact();
    }

    @Override
    public boolean validateToken(String token) throws InvalidTokenException, ServerException {
        try {
            Jwts.parser()
                    .verifyWith(getSecretKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException | MalformedJwtException | SecurityException e) {
            log.warn("Invalid or expired token: {}", e.getMessage());
            throw new InvalidTokenException("Invalid or expired token");
        } catch (Exception e) {
            log.error("Failed to validate token: {}", e.getMessage(), e);
            throw new ServerException("Failed to validate token");
        }
    }

    @Override
    public String refreshToken(String refreshToken) throws InvalidTokenException, ServerException {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSecretKey())
                    .build()
                    .parseSignedClaims(refreshToken)
                    .getPayload();

            String userId = claims.getSubject();
            return generateAccessToken(Long.valueOf(userId));
        } catch (ExpiredJwtException | MalformedJwtException | SecurityException e) {
            log.warn("Invalid or expired refresh token: {}", e.getMessage());
            throw new InvalidTokenException("Invalid or expired refresh token");
        } catch (Exception e) {
            log.error("Failed to refresh token: {}", e.getMessage(), e);
            throw new ServerException("Failed to refresh token");
        }
    }
    @Override
    public Long getUserIdFromToken(String token) throws InvalidTokenException, ServerException {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSecretKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return Long.valueOf(claims.getSubject());
        } catch (ExpiredJwtException e) {
            log.warn("Expired token: {}", e.getMessage());
            throw new InvalidTokenException("Expired token");
        } catch (MalformedJwtException | SecurityException e) {
            log.warn("Invalid token: {}", e.getMessage());
            throw new InvalidTokenException("Invalid token");
        } catch (Exception e) {
            log.error("Failed to extract user ID from token: {}", e.getMessage(), e);
            throw new ServerException("Failed to extract user ID from token");
        }
    }
}