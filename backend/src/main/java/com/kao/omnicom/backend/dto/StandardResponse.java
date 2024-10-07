package com.kao.omnicom.backend.dto;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Map;

public record StandardResponse(String time, int code, String path, HttpStatus status, String message, String exception, Map<?, ?> data) {

    public static StandardResponse getResponse(HttpServletRequest request, Map<?, ?> data, String message, HttpStatus status) {
        return new StandardResponse(LocalDateTime.now().toString(), status.value(), request.getRequestURI(), HttpStatus.valueOf(status.value()), message, "", data);
    }

}
