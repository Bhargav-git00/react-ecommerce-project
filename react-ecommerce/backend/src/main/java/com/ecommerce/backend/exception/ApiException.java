package com.ecommerce.backend.exception;

// Business error with an HTTP status code, handled by GlobalExceptionHandler
public class ApiException extends RuntimeException {

    private final int status;

    public ApiException(int status, String message) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
