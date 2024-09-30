package com.kao.omnicom.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.logging.Level;
import java.util.logging.Logger;

@RequiredArgsConstructor
public class CustomAuthenticationManager implements AuthenticationManager {

    private final Logger logger = Logger.getLogger("CustomAuthenticationManager");

    public final AuthenticationProvider provider;

    @Override
    public Authentication authenticate(Authentication authentication) {
        try {
            if (provider.supports(authentication.getClass())) {
                return provider.authenticate(authentication);
            }
            else {
                logger.log(Level.SEVERE, String.format("Custom AuthentificationProvider does not support this Authentication: %s", authentication.getClass().getName()));
                return new DaoAuthenticationProvider().authenticate(authentication);
            }
        }
        catch (AuthenticationException e) {
            logger.log(Level.SEVERE, String.format("Could not authenticate: %s", authentication.getClass().getName()));
            throw e;
        }
    }

}
