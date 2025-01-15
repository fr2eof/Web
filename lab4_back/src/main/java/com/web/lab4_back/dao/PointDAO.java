package com.web.lab4_back.dao;


import com.web.lab4_back.entity.Point;
import com.web.lab4_back.exception.ServerException;

import java.util.List;

public interface PointDAO {
    public void savePoint(Point point) throws ServerException;

    public List<Point> getPointsByUserId(Long userId);

    public void deletePointsByUserId(Long userId);

    public List<Point> getPointsByUserId(Long userId, int page, int size);
}