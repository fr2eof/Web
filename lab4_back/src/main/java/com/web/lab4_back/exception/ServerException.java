package com.web.lab4_back.exception;
import jakarta.ejb.ApplicationException;

@ApplicationException(rollback = true)
public class ServerException extends Exception {
    public ServerException(String message) {
        super(message);
    }
    public ServerException(String message, Throwable cause) {
        super(message, cause);
    }
}
