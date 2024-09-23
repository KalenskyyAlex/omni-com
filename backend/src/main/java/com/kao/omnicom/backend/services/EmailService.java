package com.kao.omnicom.backend.services;

public interface EmailService {

    void sendNewAccountEmail(String name, String to, String token);

    void sendPasswordResetEmail(String name, String to, String token);

}
