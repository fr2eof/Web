package com.web.lab4_back.dao.impl;

import com.web.lab4_back.dao.TokenDAO;
import com.web.lab4_back.entity.RefreshToken;
import com.web.lab4_back.exception.ServerException;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Stateless
public class TokenDAOImpl implements TokenDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void saveRefreshToken(Long userId, String refreshToken) throws ServerException {
        try {
            RefreshToken refreshTokenEntity = RefreshToken.builder()
                    .userId(userId)
                    .tokenHash(refreshToken)
                    .expiresAt(LocalDateTime.now().plusDays(7))
                    .createdAt(LocalDateTime.now())
                    .build();

            entityManager.persist(refreshTokenEntity);
            log.info("Refresh token saved for user ID: {}", userId);
        } catch (Exception e) {
            log.error("Error saving refresh token for user ID: {}", userId, e);
            throw new ServerException("Error saving refresh token: " + e.getMessage(), e);
        }
    }

    @Override
    public Optional<String> findRefreshTokenByUserId(Long userId) {
        log.debug("Searching refresh token for user ID: {}", userId);
        return entityManager.createQuery("SELECT rt.tokenHash FROM RefreshToken rt WHERE rt.userId = :userId", String.class)
                .setParameter("userId", userId)
                .getResultStream()
                .findFirst();
    }

    @Override
    public void deleteRefreshTokenByUserId(Long userId) {
        log.info("Deleting refresh token for user ID: {}", userId);
        int deletedCount = entityManager.createQuery("DELETE FROM RefreshToken rt WHERE rt.userId = :userId")
                .setParameter("userId", userId)
                .executeUpdate();
        log.info("Deleted {} refresh tokens for user ID: {}", deletedCount, userId);
    }
}