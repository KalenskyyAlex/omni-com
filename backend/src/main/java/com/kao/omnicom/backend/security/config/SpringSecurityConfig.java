package com.kao.omnicom.backend.security.config;

import com.kao.omnicom.backend.security.CustomAuthenticationManager;
import com.kao.omnicom.backend.security.filter.CustomAuthenticationFilter;
import com.kao.omnicom.backend.security.filter.CustomLoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, CustomAuthenticationManager customAuthenticationManager, CustomAuthenticationFilter authFilter, CustomLoginFilter loginFilter) throws Exception {
        return httpSecurity
                .authenticationManager(customAuthenticationManager)
                .addFilterBefore(authFilter,  UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(loginFilter,  UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/api/terminal/**").permitAll();
                    registry.requestMatchers("/api/user/**").permitAll();
                    registry.anyRequest().authenticated();
                })
                .httpBasic(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
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
