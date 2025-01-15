package com.web.lab4_back.service;

import com.web.lab4_back.exception.InvalidCredentialsException;
import com.web.lab4_back.exception.ServerException;
import com.web.lab4_back.exception.UserExistsException;
import com.web.lab4_back.exception.UserNotFoundException;

public interface AuthService {
    public String[] signupUser(String username, String password, String email) throws UserExistsException, ServerException, UserNotFoundException;

    public String[] loginUser(String username, String password)
            throws UserNotFoundException, InvalidCredentialsException, ServerException;

    public void logoutUser(String username, String password)
            throws UserNotFoundException, InvalidCredentialsException, ServerException;
}
