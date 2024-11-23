package com.web.dao;

import com.web.entity.Point;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class DataBaseManager implements Serializable {

    @PersistenceContext
    private EntityManager entityManager;

    public DataBaseManager() {
        // public constructor for CDI
    }

    @Transactional
    public void savePoint(Point point) {
        try {
            entityManager.persist(point);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save point", e);
        }
    }

    @Transactional
    public List<Point> getAllPoints() {
        try {
            TypedQuery<Point> query = entityManager.createQuery("SELECT point FROM Point point", Point.class);
            return query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Transactional
    public void clearAllPoints() {
        try {
            entityManager.createQuery("DELETE FROM Point").executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to clear all points", e);
        }
    }
}