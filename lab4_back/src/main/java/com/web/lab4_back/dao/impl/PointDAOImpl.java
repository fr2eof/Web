package com.web.lab4_back.dao.impl;

import com.web.lab4_back.dao.PointDAO;
import com.web.lab4_back.entity.Point;
import com.web.lab4_back.exception.ServerException;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Stateless
public class PointDAOImpl implements PointDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void savePoint(Point point) throws ServerException {
        try {
            entityManager.persist(point);
            log.info("Point saved successfully: {}", point.getId());
        } catch (Exception e) {
            log.error("Error saving point: {}", e.getMessage(), e);
            throw new ServerException("Error creating point: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Point> getPointsByUserId(Long userId) {
        TypedQuery<Point> query = entityManager.createQuery(
                "SELECT p FROM Point p WHERE p.userId = :userId", Point.class);
        query.setParameter("userId", userId);
        List<Point> points = query.getResultList();
        log.info("Retrieved {} points for user ID: {}", points.size(), userId);
        return points;
    }

    @Override
    public void deletePointsByUserId(Long userId) {
        int deletedCount = entityManager.createQuery("DELETE FROM Point p WHERE p.userId = :userId")
                .setParameter("userId", userId)
                .executeUpdate();
        log.info("Deleted {} points for user ID: {}", deletedCount, userId);
    }

    @Override
    public List<Point> getPointsByUserId(Long userId, int page, int size) {
        TypedQuery<Point> query = entityManager.createQuery(
                "SELECT p FROM Point p WHERE p.userId = :userId", Point.class);
        query.setParameter("userId", userId);
        query.setFirstResult(page * size);
        query.setMaxResults(size);
        List<Point> points = query.getResultList();
        log.info("Retrieved {} points for user ID: {} (page: {}, size: {})", points.size(), userId, page, size);
        return points;
    }
}