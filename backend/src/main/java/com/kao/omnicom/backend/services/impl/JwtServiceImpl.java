package com.kao.omnicom.backend.services.impl;

import com.kao.omnicom.backend.dto.Token;
import com.kao.omnicom.backend.dto.TokenData;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.security.config.JwtConfig;
import com.kao.omnicom.backend.services.JwtService;
import com.kao.omnicom.backend.services.UserService;
import com.kao.omnicom.backend.util.enumeration.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.logging.Logger;

import static com.kao.omnicom.backend.util.constants.Constants.*;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl extends JwtConfig implements JwtService {

    private final Logger logger = Logger.getLogger("JwtServiceImpl");

    private final UserService userService;

    private final Supplier<SecretKey> key = () ->
            Keys.hmacShaKeyFor(Decoders.BASE64.decode(getSecret()));

    private final Function<String, Claims> claimsFunction = (token) ->
            Jwts.parser()
                    .verifyWith(key.get())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

    private final Function<String, String> subject = (token) ->
            getClaimsValue(token, Claims::getSubject);

    private final BiFunction<HttpServletRequest, String, Optional<String>> extractToken = (request, cookieName) ->
            Optional.of(
                    Arrays.stream(request.getCookies() == null ?
                    new Cookie[]{new Cookie(EMPTY_VALUE, EMPTY_VALUE)} :
                    Arrays.stream(request.getCookies())
                            .filter(cookie -> Objects.equals(cookieName, cookie.getName()))
                            .map(Cookie::getValue)
                            .findAny())
                    .orElse(Optional.empty()));

    private Function<String, List<GrantedAuthority>> authorities = (token) ->
            AuthorityUtils.commaSeparatedStringToAuthorityList(new StringJoiner(AUTHORITY_DELIMITER)
                    .add(claimsFunction
                            .apply(token)
                            .get(AUTHORITIES, String.class))
                    .add(ROLE_PREFIX + claimsFunction
                            .apply(token)
                            .get(ROLE, String.class))
                    .toString());

    @Override
    public String createToken(User user, Function<Token, String> tokenFunction) {
        return "";
    }

    @Override
    public Optional<String> extractToken(HttpServletRequest request, String tokenType) {
        return Optional.empty();
    }

    @Override
    public void addCookie(HttpServletResponse response, User user, TokenType type) {

    }

    @Override
    public <T> T getTokenDate(String token, Function<TokenData, T> tokenFunction) {
        return null;
    }

}
