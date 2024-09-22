package com.kao.omnicom.backend.services.impl;

import com.kao.omnicom.backend.events.UserEvent;
import com.kao.omnicom.backend.exception.APIException;
import com.kao.omnicom.backend.jpa.entity.Role;
import com.kao.omnicom.backend.jpa.entity.User;
import com.kao.omnicom.backend.jpa.entity.VerificationToken;
import com.kao.omnicom.backend.jpa.repository.RoleRepository;
import com.kao.omnicom.backend.jpa.repository.UserRepository;
import com.kao.omnicom.backend.jpa.repository.VerificationTokenRepository;
import com.kao.omnicom.backend.services.UserService;
import com.kao.omnicom.backend.util.enumeration.Authorities;
import com.kao.omnicom.backend.util.enumeration.Events;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger logger = Logger.getLogger("UserServiceImpl");

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VerificationTokenRepository verificationTokenRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ApplicationEventPublisher publisher;

    @Override
    public void createUser(String username, String email, String password) {
        User user = userRepository.save(createNewUser(username, email, password));

        VerificationToken token = VerificationToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .build();

        verificationTokenRepository.save(token);

        publisher.publishEvent(new UserEvent(user, Events.NEW_ACCOUNT_VERIFICATION, Map.of("key", token.getToken())));
    }

    private User createNewUser(String username, String email, String password) {
        String encryptedPassword = bCryptPasswordEncoder.encode(password);
        Role roles = getRole(Authorities.USER.name());

        return User.builder()
                .password(encryptedPassword)
                .email(email)
                .emailVerified(false)
                .username(username)
                .roles(roles)
                .build();
    }

    @Override
    public Role getRole(String name) {
        return roleRepository.findByNameIgnoreCase(name).orElseThrow(() -> {
            logger.log(Level.SEVERE, "An error occurred while trying to find role with name {0}. Could not create new user", name);
            return new APIException();
        });
    }

    @Override
    public boolean validateAccount(String token) {
        Optional<VerificationToken> verificationTokenOptional = verificationTokenRepository.findByToken(token);
        if(verificationTokenOptional.isEmpty()){
            logger.log(Level.WARNING, "There were verification request, but token is invalid (or no more active)");
            return false;
        }


        VerificationToken verificationToken = verificationTokenOptional.get();

        User user = verificationToken.getUser();
        user.setEmailVerified(true);

        userRepository.save(user);
        verificationTokenRepository.deleteById(verificationToken.getId()); // token no more active

        logger.log(Level.FINE, "Verification for user {0} was successful", user.getUsername());

        return true;
    }

}
