package com.kao.omnicom.backend.domain;

import com.kao.omnicom.backend.dto.User;
import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.Collection;

public class ApiAuthentication extends AbstractAuthenticationToken {

    private static final String PASSWORD = "[PASSWORD PROTECTED]";
    private static final String EMAIL = "[EMAIL PROTECTED]";

    private User user;
    @Getter
    private String email;
    @Getter
    private String password;
    private boolean authenticated;

    @Override
    public void setAuthenticated(boolean isAuthenticated) {
        super.setAuthenticated(isAuthenticated);
    }

    private ApiAuthentication(User user, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);

        this.user = user;
        this.email = EMAIL;
        this.password = PASSWORD;
        this.authenticated = true;
    }

    private ApiAuthentication(String email, String password) {
        super(AuthorityUtils.NO_AUTHORITIES);

        this.email = email;
        this.password = password;
        this.authenticated = false;
    }

    public static ApiAuthentication unauthenticated (String email, String password) {
        return new ApiAuthentication(email, password);
    }

    public static ApiAuthentication authenticated (User user, Collection<? extends GrantedAuthority> authorities) {
        return new ApiAuthentication(user, authorities);
    }

    @Override
    public Object getCredentials() {
        return PASSWORD;
    }

    @Override
    public Object getPrincipal() {
        return user;
    }

}
