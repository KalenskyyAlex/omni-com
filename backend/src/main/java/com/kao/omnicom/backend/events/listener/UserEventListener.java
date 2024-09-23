package com.kao.omnicom.backend.events.listener;

import com.kao.omnicom.backend.events.UserEvent;
import com.kao.omnicom.backend.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserEventListener {

    private final EmailService emailService;

    @EventListener
    public void onUserEvent(UserEvent event) {
        switch (event.getType()) {
            case NEW_ACCOUNT_VERIFICATION ->
                    emailService.sendNewAccountEmail(event.getUser().getUsername(), event.getUser().getEmail(), (String) event.getData().get("key"));
            case PASSWORD_RESET ->
                    emailService.sendPasswordResetEmail(event.getUser().getUsername(), event.getUser().getEmail(), (String) event.getData().get("key"));
            default -> {/* TODO */}
        }
    }

}
