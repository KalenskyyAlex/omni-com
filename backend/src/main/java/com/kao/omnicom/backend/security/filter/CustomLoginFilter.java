package com.kao.omnicom.backend.security.filter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kao.omnicom.backend.dto.LoginRequest;
import com.kao.omnicom.backend.dto.StandardResponse;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.exception.CustomAuthenticationException;
import com.kao.omnicom.backend.security.CustomAuthenticationToken;
import com.kao.omnicom.backend.services.JwtService;
import com.kao.omnicom.backend.services.UserService;
import com.kao.omnicom.backend.util.enumeration.LoginType;
import com.kao.omnicom.backend.util.enumeration.TokenType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.kao.omnicom.backend.dto.StandardResponse.getResponse;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class CustomLoginFilter extends AbstractAuthenticationProcessingFilter {

    private final Logger logger = Logger.getLogger("CustomLoginFilter");

    private final UserService userService;
    private final JwtService jwtService;

    private LoginRequest cachedUser;

    protected CustomLoginFilter(AuthenticationManager authenticationManager, UserService userService, JwtService jwtService) {
        super(new AntPathRequestMatcher("/api/login", POST.name()), authenticationManager);

        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        logger.log(Level.INFO, "Custom login filter invoked");

        try {
            LoginRequest user = new ObjectMapper()
                    .configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true)
                    .readValue(request.getInputStream(), LoginRequest.class);

            cachedUser = user;

            Authentication auth = CustomAuthenticationToken.unauthenticated(user.getEmail(), user.getPassword());

            return getAuthenticationManager().authenticate(auth);
        } catch (Exception exception) {
            logger.log(Level.SEVERE, exception.getMessage());
            throw new CustomAuthenticationException(exception.getMessage());
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        User user = (User) authentication.getPrincipal();
        userService.updateLoginAttempt(user.getEmail(), LoginType.LOGIN_SUCCESS);

        StandardResponse response_ = sendResponse(request, response, user);
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(OK.value());

        ServletOutputStream out = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(out, response_);
        out.flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        logger.log(Level.WARNING, "Increasing unsuccessful loginAttempts count");
        userService.updateLoginAttempt(cachedUser.getEmail(), LoginType.LOGIN_ATTEMPT);

        super.unsuccessfulAuthentication(request, response, failed);
    }

    private StandardResponse sendResponse(HttpServletRequest request, HttpServletResponse response, User user) {
        jwtService.addCookie(response, user, TokenType.ACCESS);
        jwtService.addCookie(response, user, TokenType.REFRESH);

        return getResponse(request, Map.of("user", user), "Login Success", OK);
    }
}
