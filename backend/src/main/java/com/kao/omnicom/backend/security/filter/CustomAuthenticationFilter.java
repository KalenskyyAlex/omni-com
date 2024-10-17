package com.kao.omnicom.backend.security.filter;

import com.kao.omnicom.backend.dto.rest.StandardResponse;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.exception.CustomAuthenticationException;
import com.kao.omnicom.backend.security.CustomAuthenticationToken;
import com.kao.omnicom.backend.security.util.NegateRequestMatcher;
import com.kao.omnicom.backend.services.JwtService;
import com.kao.omnicom.backend.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.kao.omnicom.backend.dto.rest.StandardResponse.getResponse;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.OK;

@Component
public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final Logger logger = Logger.getLogger("CustomAuthenticationFilter");

    //    private final UserService userService;
    private final JwtService jwtService;
//
//    private LoginRequest cachedUser;

    protected CustomAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService, JwtService jwtService) {
        super(new NegateRequestMatcher(new AntPathRequestMatcher("/api/login", POST.name())), authenticationManager);

        this.jwtService = jwtService;
//        this.userService = userService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        logger.log(Level.INFO, "Custom auth filter invoked");

        try {
            validateCookies(request, response, null);
//            LoginRequest user = new ObjectMapper()
//                    .configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true)
//                    .readValue(request.getInputStream(), LoginRequest.class);
//
//            cachedUser = user;
//
            Authentication auth = CustomAuthenticationToken.unauthenticated("oleksandrkalenskij7@gmail.com", "skibidi");
//
            return getAuthenticationManager().authenticate(auth);
        } catch (Exception exception) {
            logger.log(Level.SEVERE, exception.getMessage());
            throw new CustomAuthenticationException(exception.getMessage());
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
//        User user = (User) authentication.getPrincipal();
//        userService.updateLoginAttempt(user.getEmail(), LoginType.LOGIN_SUCCESS);
//
//        StandardResponse response_ = sendResponse(request, response, user);
//        response.setContentType(APPLICATION_JSON_VALUE);
//        response.setStatus(OK.value());
//
//        ServletOutputStream out = response.getOutputStream();
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.writeValue(out, response_);
//        out.flush();
        logger.log(Level.INFO, "Authentication successful");
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
//        logger.log(Level.WARNING, "Increasing unsuccessful loginAttempts count");
//        userService.updateLoginAttempt(cachedUser.getEmail(), LoginType.LOGIN_ATTEMPT);
//
//        super.unsuccessfulAuthentication(request, response, failed);
        logger.log(Level.INFO, "Authentication unsuccessful");
    }

    private StandardResponse validateCookies(HttpServletRequest request, HttpServletResponse response, User user) {
//        jwtService.addCookie(response, user, TokenType.ACCESS);
//        jwtService.addCookie(response, user, TokenType.REFRESH);

        Cookie cookie = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("access-token"))
                .findFirst()
                .orElseThrow(() -> {
                    logger.log(Level.SEVERE, "Bad access token");
                    return new CustomAuthenticationException("Bad access token");
                });

        return getResponse(request, Map.of("user", "user"), "Login Success", OK);
    }
}
