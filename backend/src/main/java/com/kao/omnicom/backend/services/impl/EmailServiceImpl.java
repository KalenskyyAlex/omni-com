package com.kao.omnicom.backend.services.impl;

import com.kao.omnicom.backend.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;


@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final Logger logger = Logger.getLogger("EmailServiceImpl");
    private static final String NEW_USER_ACCOUNT_SUBJ = "New User Account Verification";
    private static final String RESET_PASSWORD_SUBJ = "Reset Password Request";

    private final JavaMailSender sender;

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private String getVerificationURL(String host, String token) {
        return host + "verify/account?token=" + token;
    }

    private String getResetURL(String host, String token) {
        return host + "verify/password?token=" + token;
    }

    private String getNewUserEmailMessage(String name, String host, String token) {
        return "Hello " + name + ", \n\n. Your new account on OMNICOM is about to be created. " +
                "Please, click on the link below to verify your account.\n\n" + getVerificationURL(host, token)
                + "\n\n If you haven't signed up on OMNICOM, ignore this email";
    }

    private String getResetEmailMessage(String name, String host, String token) {
        return "Hello " + name + ", \n\n. To reset your password, " +
                "please, click on the link below to verify your account.\n\n" + getResetURL(host, token)
                + "\n\n If you haven't made password reset request, ignore this email";
    }

    @Override
    @Async
    public void sendNewAccoutEmail(String name, String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject(NEW_USER_ACCOUNT_SUBJ);
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText(getNewUserEmailMessage(name, host, token));
            sender.send(message);
        }
        catch (Exception e) {
            logger.log(Level.SEVERE, "Error while sending new user verification email:" + e.getMessage());
        }
    }

    @Override
    @Async
    public void sendPasswordResetEmail(String name, String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject(RESET_PASSWORD_SUBJ);
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText(getResetEmailMessage(name, host, token));
            sender.send(message);
        }
        catch (Exception e) {
            logger.log(Level.SEVERE, "Error while sending new user verification email:" + e.getMessage());
        }
    }

}
