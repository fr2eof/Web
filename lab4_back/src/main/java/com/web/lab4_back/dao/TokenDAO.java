package com.web.lab4_back.dao;

import com.web.lab4_back.exception.ServerException;

import java.util.Optional;
public interface TokenDAO {
    void saveRefreshToken(Long userId, String refreshToken) throws ServerException;
    Optional<String> findRefreshTokenByUserId(Long userId);
    void deleteRefreshTokenByUserId(Long userId);
}