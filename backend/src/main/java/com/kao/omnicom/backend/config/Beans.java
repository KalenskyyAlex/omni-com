package com.kao.omnicom.backend.config;

import com.kao.omnicom.backend.jpa.entity.Role;
import com.kao.omnicom.backend.jpa.repository.RoleRepository;
import com.kao.omnicom.backend.util.enumeration.Authorities;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class Beans {

    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSenderImpl();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner commandLineRunner(RoleRepository roleRepository) {
        return args -> {
            Role userRole = Role.builder()
                    .name(Authorities.USER.name())
                    .authorities(Authorities.USER)
                    .build();

            Role adminRole = Role.builder()
                    .name(Authorities.ADMIN.name())
                    .authorities(Authorities.ADMIN)
                    .build();

            Role masterAdminRole = Role.builder()
                    .name(Authorities.MASTER_ADMIN.name())
                    .authorities(Authorities.MASTER_ADMIN)
                    .build();

            if(!roleRepository.existsByName(Authorities.USER.name())) {
                roleRepository.save(userRole);
            }
            if(!roleRepository.existsByName(Authorities.ADMIN.name())) {
                roleRepository.save(adminRole);
            }
            if(!roleRepository.existsByName(Authorities.MASTER_ADMIN.name())) {
                roleRepository.save(masterAdminRole);
            }
        };
    }

}
