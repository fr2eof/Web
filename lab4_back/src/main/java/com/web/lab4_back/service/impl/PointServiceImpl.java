package com.web.lab4_back.service.impl;

import com.web.lab4_back.dao.PointDAO;
import com.web.lab4_back.dao.UserDAO;
import com.web.lab4_back.entity.Point;
import com.web.lab4_back.entity.User;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.exception.UserNotFoundException;
import com.web.lab4_back.service.PointService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Optional;

@Slf4j
@ApplicationScoped
public class PointServiceImpl implements PointService {

    @Inject
    PointDAO pointDAO;

    @Inject
    UserDAO userDAO;

    @Override
    public List<Point> getAllPointsById(@NotNull Long id) throws UserNotFoundException {
        checkUserExists(id);
        List<Point> pointList = pointDAO.getPointsByUserId(id);
        log.info("Retrieved {} points for user ID: {}", pointList.size(), id);
        return pointList;
    }

    @Override
    public List<Point> getAllPointsById(@NotNull Long id, int page, int size) throws IllegalArgumentException, UserNotFoundException {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Page and size must be positive");
        }
        checkUserExists(id);
        List<Point> pointList = pointDAO.getPointsByUserId(id, page, size);
        log.info("Retrieved {} points for user ID: {} (page: {}, size: {})", pointList.size(), id, page, size);
        return pointList;
    }

    @Override
    public void savePoint(Long userId, double x, double y, double r, boolean inArea) throws ServerException, IllegalArgumentException, UserNotFoundException {
        checkUserExists(userId);
        Point point = Point.builder()
                .userId(userId)
                .x(x)
                .y(y)
                .r(r)
                .inArea(inArea)
                .build();
        pointDAO.savePoint(point);
        log.info("Point saved successfully: {}", point);
    }

    @Override
    public void deletePointsByUserId(@NotNull Long id) throws UserNotFoundException {
        checkUserExists(id);
        pointDAO.deletePointsByUserId(id);
        log.info("Deleted points for user ID: {}", id);
    }

    private void checkUserExists(Long userId) throws UserNotFoundException {
        Optional<User> user = userDAO.findUserById(userId);
        if (user.isEmpty()) {
            log.error("User with ID {} not found", userId);
            throw new UserNotFoundException("User with ID " + userId + " not found");
        }
    }
}