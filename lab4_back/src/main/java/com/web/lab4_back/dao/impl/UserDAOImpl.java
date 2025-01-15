package com.web.lab4_back.dao.impl;

import com.web.lab4_back.dao.UserDAO;
import com.web.lab4_back.entity.User;
import com.web.lab4_back.exception.ServerException;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@Stateless
public class UserDAOImpl implements UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<User> findUserByUsername(String username) {
        log.info("Searching for user by username: {}", username);
        TypedQuery<User> query = entityManager
                .createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
        query.setParameter("username", username);

        return query.getResultStream().findFirst();
    }

    @Override
    public Optional<User> findUserById(long id) {
        User user = entityManager.find(User.class, id);
        return Optional.ofNullable(user);
    }

    @Override
    public void saveUser(User user) throws ServerException {
        try {
            entityManager.persist(user);
            log.info("User saved successfully: {}", user.getUsername());
        } catch (Exception e) {
            log.error("Error saving user: {}", e.getMessage(), e);
            throw new ServerException("Error creating User: " + e.getMessage(), e);
        }
    }
}