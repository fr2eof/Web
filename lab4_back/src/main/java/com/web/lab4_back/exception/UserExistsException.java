package com.web.lab4_back.exception;

public class UserExistsException extends Exception {
    public UserExistsException(String message) {
        super(message);
    }
}