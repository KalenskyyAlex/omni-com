package com.kao.omnicom.backend.config;

import com.kao.omnicom.backend.services.EmailService;
import com.kao.omnicom.backend.services.impl.EmailServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class Beans {

    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSenderImpl();
    }

//    @Bean
//    public EmailService emailService() {
//        return new EmailServiceImpl(javaMailSender());
//    }

}
