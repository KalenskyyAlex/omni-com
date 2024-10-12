package com.kao.omnicom.backend.services.impl;

import com.kao.omnicom.backend.dto.Token;
import com.kao.omnicom.backend.dto.TokenData;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.jpa.converter.UserConverter;
import com.kao.omnicom.backend.security.config.JwtConfig;
import com.kao.omnicom.backend.services.JwtService;
import com.kao.omnicom.backend.services.UserService;
import com.kao.omnicom.backend.util.enumeration.TokenType;
import com.kao.omnicom.backend.util.function.TriConsumer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
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
import java.time.Instant;
import java.util.*;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.logging.Logger;

import static com.kao.omnicom.backend.util.constants.Constants.*;
import static com.kao.omnicom.backend.util.enumeration.TokenType.ACCESS;
import static com.kao.omnicom.backend.util.enumeration.TokenType.REFRESH;
import static io.jsonwebtoken.Header.JWT_TYPE;
import static io.jsonwebtoken.Header.TYPE;
import static org.springframework.boot.web.server.Cookie.SameSite.NONE;

import org.springframework.beans.factory.annotation.Value;


@Service
@RequiredArgsConstructor
public class JwtServiceImpl extends JwtConfig implements JwtService {

    @Value("${jwt.cookie.secure}")
    private boolean cookieSecure;

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
                            Arrays.stream(request.getCookies() == null ? new Cookie[]{new Cookie(EMPTY_COOKIE, EMPTY_COOKIE)} : request.getCookies())
                                    .filter(cookie -> Objects.equals(cookieName, cookie.getName()))
                                    .map(Cookie::getValue)
                                    .findAny())
                    .orElse(Optional.empty());

    private final BiFunction<HttpServletRequest, String, Optional<Cookie>> extractCookie = (request, cookieName) ->
            Optional.of(
                            Arrays.stream(request.getCookies() == null ? new Cookie[]{new Cookie(EMPTY_COOKIE, EMPTY_COOKIE)} : request.getCookies())
                                    .filter(cookie -> Objects.equals(cookieName, cookie.getName()))
                                    .findAny())
                    .orElse(Optional.empty());

    private final Supplier<JwtBuilder> builder = () ->
            Jwts.builder()
                    .header().add(Map.of(TYPE, JWT_TYPE))
                    .and()
                    .audience().add(AUDIENCE)
                    .and()
                    .id(UUID.randomUUID().toString())
                    .issuedAt(Date.from(Instant.now()))
                    .notBefore(Date.from(Instant.now()))
                    .signWith(key.get(), Jwts.SIG.HS512);

    private final BiFunction<User, TokenType, String> buildToken = (user, type) ->
            Objects.equals(type, ACCESS) ?
                    builder.get()
                            .subject(user.getId())
                            .claim(AUTHORITIES, user.getAuthorities())
                            .claim(ROLE, user.getRole())
                            .expiration(Date.from(Instant.now().plusMillis(getExpiration())))
                            .compact() :
                    builder.get()
                            .subject(user.getId())
                            .expiration(Date.from(Instant.now().plusMillis(getExpiration())))
                            .compact();

    private final TriConsumer<HttpServletResponse, User, TokenType> addCookie = (response, user, type) -> {
        switch (type) {
            case ACCESS -> {
                String accessToken = createToken(user, Token::getAccessToken);
                Cookie cookie = new Cookie(type.getName(), accessToken);
                cookie.setHttpOnly(true);
                cookie.setSecure(cookieSecure);
                cookie.setMaxAge(2 * 60);
                cookie.setPath("/");
                cookie.setAttribute("SameSite", NONE.name());

                response.addCookie(cookie);
            }
            case REFRESH -> {
                String refreshToken = createToken(user, Token::getRefreshToken);
                Cookie cookie = new Cookie(type.getName(), refreshToken);
                cookie.setHttpOnly(true);
                cookie.setSecure(cookieSecure);
                cookie.setMaxAge(2 * 60 * 60);
                cookie.setPath("/");
                cookie.setAttribute("SameSite", NONE.name());

                response.addCookie(cookie);
            }
        }
    };

    private <T> T getClaimsValue(String token, Function<Claims, T> claims) {
        return claimsFunction.andThen(claims).apply(token);
    }


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
        Token token = Token.builder()
                .accessToken(buildToken.apply(user, ACCESS))
                .refreshToken(buildToken.apply(user, REFRESH))
                .build();

        return tokenFunction.apply(token);
    }

    @Override
    public Optional<String> extractToken(HttpServletRequest request, String cookieName) {
        return extractToken.apply(request, cookieName);
    }

    @Override
    public void addCookie(HttpServletResponse response, User user, TokenType type) {
        addCookie.accept(response, user, type);
    }

    @Override
    public <T> T getTokenData(String token, Function<TokenData, T> tokenFunction) {
        User user = UserConverter.toDTO(userService.getUserByUserId(subject.apply(token)));

        return tokenFunction.apply(TokenData.builder()
                        .valid(Objects.equals(user.getId(), claimsFunction.apply(token).getSubject()))
                        .authorities(authorities.apply(token))
                        .claims(claimsFunction.apply(token))
                        .user(user)
                        .build());
    }

    @Override
    public void removeCookie(HttpServletRequest request, HttpServletResponse response, String cookieName) {
        Optional<Cookie> cookieOptional = extractCookie.apply(request, cookieName);

        if(cookieOptional.isPresent()) {
            Cookie cookie = cookieOptional.get();
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
    }

}
