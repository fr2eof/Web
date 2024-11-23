package com.web.service;

import com.web.dao.DataBaseManager;
import com.web.entity.Point;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Stateless
public class HitCheckService implements Serializable {

    @Inject
    private DataBaseManager dataBaseManager;

    //todo change
    public boolean isInside(double x, double y, double radius) {
        return x * x + y * y <= radius * radius;
    }

    public Point calculate(double x, double y, double r) {
        Point result = new Point(x, y, r);
        long startTime = System.nanoTime();
        result.setInsideArea(isInside(x, y, r));
        long endTime = System.nanoTime();
        result.setRequestTime(new Date());
        result.setExecutionTime(endTime - startTime);
        return result;
    }

    public void saveResult(Point point) {
        dataBaseManager.savePoint(point);
    }

    public List<Point> getAllResults() {
        return dataBaseManager.getAllPoints();
    }
}
