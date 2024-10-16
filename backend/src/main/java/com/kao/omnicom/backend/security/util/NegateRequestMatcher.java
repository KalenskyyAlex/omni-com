package com.kao.omnicom.backend.security.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.util.matcher.RequestMatcher;

@RequiredArgsConstructor
public class NegateRequestMatcher implements RequestMatcher {

    private final RequestMatcher requestMatcher;

    @Override
    public boolean matches(HttpServletRequest request) {
        return !requestMatcher.matches(request);
    }

}
