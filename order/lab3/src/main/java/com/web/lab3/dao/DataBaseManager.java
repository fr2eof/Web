package com.web.lab3.dao;

import com.web.lab3.entity.Point;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceContext;

import java.io.Serializable;
import java.util.ArrayList;

public class DataBaseManager implements Serializable {

    private static volatile DataBaseManager instance;

    public static DataBaseManager getInstance() {
        DataBaseManager localInstance = instance;
        if (localInstance == null) {
            synchronized (DataBaseManager.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new DataBaseManager();
                }
            }
        }
        return localInstance;
    }


    @PersistenceContext
    private EntityManager manager;

    public DataBaseManager() {
        var managerFactory = Persistence.createEntityManagerFactory("default");
        manager = managerFactory.createEntityManager();
    }

    public void savePoint(Point point) {
        var transaction = manager.getTransaction();
        try {
            transaction.begin();
            manager.persist(point);
            transaction.commit();
        } catch (Exception e) {
            if (transaction.isActive()) transaction.rollback();
        }
    }

    public ArrayList<Point> getAllPoints() {
        var transaction = manager.getTransaction();
        try {
            transaction.begin();
            var res = new ArrayList<>(manager.createQuery("select p from Point p", Point.class).getResultList());
            transaction.commit();
            return res;
        } catch (Exception e) {
            if (transaction.isActive()) transaction.rollback();
            return new ArrayList<>();
        }
    }

    public void clearAllPoints() {
        var transaction = manager.getTransaction();
        transaction.begin();
        manager.createQuery("delete from Point p").executeUpdate();
        transaction.commit();
    }
}