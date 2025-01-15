package com.web.lab4_back.service;

import com.web.lab4_back.entity.Point;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.exception.UserNotFoundException;

import java.util.List;

public interface PointService {
    public List<Point> getAllPointsById(Long id) throws ServerException, UserNotFoundException;

    public List<Point> getAllPointsById(Long id, int page, int size) throws IllegalArgumentException, UserNotFoundException;

    public void savePoint(Long userId, double x, double y, double r, boolean inArea) throws ServerException, UserNotFoundException, IllegalArgumentException;

    public void deletePointsByUserId(Long id) throws UserNotFoundException;
}
