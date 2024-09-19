package com.kao.omnicom.backend.exception;

public class APIException extends RuntimeException {

    public APIException(String message) {
        super(message);
    }

    public APIException() {
        super("API error occurred");
    }

}
