package com.kao.omnicom.backend.security;

import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.dto.UserPrincipal;
import com.kao.omnicom.backend.exception.APIException;
import com.kao.omnicom.backend.jpa.converter.UserConverter;
import com.kao.omnicom.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserService userService;
    private final BCryptPasswordEncoder encoder;

    private final Consumer<UserPrincipal> validAccount = (user) -> {
        if (!user.isAccountNonLocked()) throw new APIException("Account locked");
        if (!user.isEnabled()) throw new APIException("Account disabled");
        if (!user.isAccountNonExpired()) throw new APIException("Account expired");
        if (!user.isCredentialsNonExpired()) throw new APIException("Password expired");
    };

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        CustomAuthenticationToken token = (CustomAuthenticationToken) authentication;
        User user = UserConverter.toDTO(userService.getUserByEmail(token.getEmail()));

        if (user == null) throw new APIException("Unable to authenticate");

        UserPrincipal userPrincipal = new UserPrincipal(user);
        validAccount.accept(userPrincipal);

        if(encoder.matches(token.getPassword(), userPrincipal.getPassword())){
            return CustomAuthenticationToken.authenticated(user, userPrincipal.getAuthorities());
        }

        throw new APIException("Bad Credentials");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return CustomAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
