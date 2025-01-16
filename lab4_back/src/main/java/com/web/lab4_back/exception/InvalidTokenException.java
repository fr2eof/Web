package com.web.lab4_back.exception;
import jakarta.ejb.ApplicationException;

@ApplicationException(rollback = true)
public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }
}
