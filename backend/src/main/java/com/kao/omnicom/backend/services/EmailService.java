package com.kao.omnicom.backend.services;

public interface EmailService {

    void sendNewAccoutEmail(String name, String to, String token);

    void sendPasswordResetEmail(String name, String to, String token);

}
