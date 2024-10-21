package com.kao.omnicom.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationManager implements AuthenticationManager {

    private final Logger logger = Logger.getLogger("CustomAuthenticationManager");

    public final List<AuthenticationProvider> providers;

    @Override
    public Authentication authenticate(Authentication authentication) {
        logger.log(Level.INFO, "CustomAuthenticationManager invoked");

        try {
            for(AuthenticationProvider provider: providers) {
                if (provider.supports(authentication.getClass())) {
                    return provider.authenticate(authentication);
                }
            }

            logger.log(Level.SEVERE, String.format("Custom AuthentificationProvider does not support this Authentication: %s", authentication.getClass().getName()));
            return new DaoAuthenticationProvider().authenticate(authentication);
        }
        catch (AuthenticationException e) {
            logger.log(Level.SEVERE, String.format("Could not authenticate: %s", authentication.getClass().getName()));
            throw e;
        }
    }

}
