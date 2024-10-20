package com.kao.omnicom.backend.security.config;

import com.kao.omnicom.backend.security.CustomAuthenticationManager;
import com.kao.omnicom.backend.security.provider.CustomAuthenticationProvider;
import com.kao.omnicom.backend.security.filter.CustomAuthenticationFilter;
import com.kao.omnicom.backend.security.filter.CustomLoginFilter;
import com.kao.omnicom.backend.security.provider.CustomEncryptedAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, CustomAuthenticationManager customAuthenticationManager, CustomAuthenticationFilter authFilter, CustomLoginFilter loginFilter) throws Exception {
        return httpSecurity
                .authenticationManager(customAuthenticationManager)
                .addFilterBefore(authFilter,  AnonymousAuthenticationFilter.class)
                .addFilterBefore(loginFilter,  AnonymousAuthenticationFilter.class)
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/api/terminal/**").permitAll();
                    registry.requestMatchers("/api/login/**").permitAll();
                    registry.requestMatchers("/api/verify/**").permitAll();
                    registry.anyRequest().authenticated();
                })
                .httpBasic(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public List<AuthenticationProvider> providerList (CustomAuthenticationProvider customAuthenticationProvider, CustomEncryptedAuthenticationProvider customEncryptedAuthenticationProvider) {
        return List.of(customAuthenticationProvider, customEncryptedAuthenticationProvider);
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService(BCryptPasswordEncoder passwordEncoder) {
        UserDetails user = User.withUsername("user")
                .password(passwordEncoder.encode("pass")) // Encode the password
                .roles("USER")  // Add roles as necessary
                .build();

        return new InMemoryUserDetailsManager(user);
    }

}
