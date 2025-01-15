package com.web.lab4_back.service;

import com.web.lab4_back.exception.InvalidTokenException;
import com.web.lab4_back.exception.ServerException;

public interface TokenService {
    String generateAccessToken(Long userId);

    String generateRefreshToken(Long userId);

    boolean validateToken(String token) throws InvalidTokenException, ServerException;

    public String refreshToken(String refreshToken) throws InvalidTokenException, ServerException;

    public Long getUserIdFromToken(String token) throws InvalidTokenException, ServerException;

}