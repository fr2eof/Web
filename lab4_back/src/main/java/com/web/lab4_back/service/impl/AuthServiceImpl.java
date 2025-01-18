package com.web.lab4_back.service.impl;

import com.web.lab4_back.dao.TokenDAO;
import com.web.lab4_back.service.TokenService;
import com.web.lab4_back.util.PasswordHasher;
import com.web.lab4_back.dao.UserDAO;
import com.web.lab4_back.entity.User;
import com.web.lab4_back.exception.*;
import com.web.lab4_back.service.AuthService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class AuthServiceImpl implements AuthService {
    @Inject
    private UserDAO userDAO;
    @Inject
    private TokenService tokenService;
    @Inject
    private TokenDAO tokenDAO;

    @Override
    public String[] signupUser(String username, String password, String email) throws UserExistsException, ServerException {
        if (userDAO.findUserByUsername(username).isPresent()) {
            log.info("User found with username: {}", username);
            throw new UserExistsException("User already exists: " + username);
        }
        String hashedPassword = PasswordHasher.hashPassword(password.toCharArray());

        User newUser = User.builder()
                .username(username)
                .password(hashedPassword)
                .email(email)
                .build();
        userDAO.saveUser(newUser);

        String accessToken = tokenService.generateAccessToken(newUser.getId());
        String refreshToken = tokenService.generateRefreshToken(newUser.getId());

        tokenDAO.saveRefreshToken(newUser.getId(), refreshToken);

        return new String[]{String.valueOf(newUser.getId()), accessToken, refreshToken};

    }

    @Override
    public String[] loginUser(String username, String password)
            throws UserNotFoundException, InvalidCredentialsException, ServerException {
        var user = userDAO.findUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));

        if (!PasswordHasher.checkPassword(password.toCharArray(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password for user: " + username);
        }
        tokenDAO.deleteRefreshTokenByUserId(user.getId());

        String accessToken = tokenService.generateAccessToken(user.getId());
        String refreshToken = tokenService.generateRefreshToken(user.getId());

        tokenDAO.saveRefreshToken(user.getId(), refreshToken);

        return new String[]{String.valueOf(user.getId()), accessToken, refreshToken};
    }

    @Override
    public void logoutUser(String username, String password) throws UserNotFoundException, InvalidCredentialsException {
        var user = userDAO.findUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));

//        if (!PasswordHasher.checkPassword(password.toCharArray(), user.getPassword())) {
//            throw new InvalidCredentialsException("Invalid password for user: " + username);
//        }
        tokenDAO.deleteRefreshTokenByUserId(user.getId());
    }
}