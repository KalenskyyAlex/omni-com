package com.kao.omnicom.backend.security.token;

import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.exception.APIException;
import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.Collection;

public class CustomAuthenticationToken extends AbstractAuthenticationToken {

    private static final String PASSWORD = "[PASSWORD PROTECTED]";
    private static final String EMAIL = "[EMAIL PROTECTED]";

    private final User user;
    @Getter
    private final String email;
    @Getter
    private final String password;
    private final boolean authenticated;

    private CustomAuthenticationToken(User user, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);

        this.user = user;
        this.email = EMAIL;
        this.password = PASSWORD;
        this.authenticated = true;
    }

    private CustomAuthenticationToken(String email, String password) {
        super(AuthorityUtils.NO_AUTHORITIES);

        this.user = null;
        this.email = email;
        this.password = password;
        this.authenticated = false;
    }

    public static CustomAuthenticationToken unauthenticated (String email, String password) {
        return new CustomAuthenticationToken(email, password);
    }

    public static CustomAuthenticationToken authenticated (User user, Collection<? extends GrantedAuthority> authorities) {
        return new CustomAuthenticationToken(user, authorities);
    }

    @Override
    public Object getCredentials() {
        return PASSWORD;
    }

    @Override
    public Object getPrincipal() {
        return user;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) {
        throw new APIException("Create new authenticated Token to authenticate. You cannot set authenticated");
    }

    @Override
    public boolean isAuthenticated() {
        return this.authenticated;
    }

}
