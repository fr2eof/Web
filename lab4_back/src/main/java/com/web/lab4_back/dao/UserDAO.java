package com.web.lab4_back.dao;

import com.web.lab4_back.entity.User;
import com.web.lab4_back.exception.ServerException;
import jakarta.ejb.Stateless;

import java.util.Optional;

public interface UserDAO {
    public Optional<User> findUserByUsername(String username);

    public Optional<User> findUserById(long id);

    public void saveUser(User user) throws ServerException;
}