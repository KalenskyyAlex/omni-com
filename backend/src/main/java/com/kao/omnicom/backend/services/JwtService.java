package com.kao.omnicom.backend.services;

import com.kao.omnicom.backend.dto.Token;
import com.kao.omnicom.backend.dto.TokenData;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.util.enumeration.TokenType;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;
import java.util.function.Function;

public interface JwtService {

    String createToken(User user, Function<Token, String> tokenFunction);

    Optional<String> extractToken(HttpServletRequest request, String tokenType);

    void addCookie(HttpServletResponse response, User user, TokenType type);

    <T> T getTokenData(String token, Function<TokenData, T> tokenFunction);

    Claims verifyAndGetClaims(String token);

    void removeCookie(HttpServletRequest request, HttpServletResponse response, String cookieName);

}
