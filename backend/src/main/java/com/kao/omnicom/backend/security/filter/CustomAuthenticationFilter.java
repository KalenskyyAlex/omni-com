package com.kao.omnicom.backend.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kao.omnicom.backend.dto.rest.LoginRequest;
import com.kao.omnicom.backend.dto.rest.StandardResponse;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.exception.CustomAuthenticationException;
import com.kao.omnicom.backend.jpa.converter.UserConverter;
import com.kao.omnicom.backend.security.token.CustomEncryptedAuthenticationToken;
import com.kao.omnicom.backend.security.util.NegateRequestMatcher;
import com.kao.omnicom.backend.services.JwtService;
import com.kao.omnicom.backend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.kao.omnicom.backend.dto.rest.StandardResponse.getResponse;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final Logger logger = Logger.getLogger("CustomAuthenticationFilter");

    private final UserService userService;
    private final JwtService jwtService;

    protected CustomAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService, JwtService jwtService) {
        super(new NegateRequestMatcher(new AntPathRequestMatcher("/api/login", POST.name())), authenticationManager);

        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        logger.log(Level.INFO, "Custom auth filter invoked");

        try {
            LoginRequest user = new LoginRequest();
            StandardResponse response_ = validateCookies(request, user);

            if (response_ != null) {
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setStatus(OK.value());

                ServletOutputStream out = response.getOutputStream();
                ObjectMapper mapper = new ObjectMapper();
                mapper.writeValue(out, response_);
                out.flush();

                throw new CustomAuthenticationException();
            }

            Authentication auth = CustomEncryptedAuthenticationToken.unauthenticated(user.getEmail(), user.getPassword());

            return getAuthenticationManager().authenticate(auth);
        } catch (Exception exception) {
            logger.log(Level.SEVERE, exception.getMessage());
            throw new CustomAuthenticationException(exception.getMessage());
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(authentication);
        logger.log(Level.INFO, "Authentication successful");
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        logger.log(Level.INFO, "Authentication unsuccessful");
        super.unsuccessfulAuthentication(request, response, failed);
    }

    private StandardResponse validateCookies(HttpServletRequest request, LoginRequest user) {
        String token = jwtService.extractToken(request, "access-token").orElseThrow(() -> {
            logger.log(Level.SEVERE, "Bad access token");
            return new CustomAuthenticationException("Bad access token");
        });

        Claims claims = jwtService.verifyAndGetClaims(token);

        if (!claims.getAudience().contains("OMNICOM")) {
            logger.log(Level.SEVERE, "Token with bad audience");
            throw new CustomAuthenticationException();
        }

        if (!claims.getIssuedAt().before(new Date())) {
            logger.log(Level.SEVERE, "Token issued in future");
            throw new CustomAuthenticationException();
        }

        if (!claims.getNotBefore().before(new Date())) {
            logger.log(Level.SEVERE, "Token issued in future");
            throw new CustomAuthenticationException();
        }

        StandardResponse response_ = null;
        if (claims.getExpiration().before(new Date())) {
            logger.log(Level.SEVERE, "Token expired");

            response_ = getResponse(request, Map.of(), "Token Expired", HttpStatus.UNAUTHORIZED);
        }
        else {
            User userDTO = UserConverter.toDTO(userService.getUserByUserId(claims.getSubject()));

            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword());
        }

        return response_;
    }
}
