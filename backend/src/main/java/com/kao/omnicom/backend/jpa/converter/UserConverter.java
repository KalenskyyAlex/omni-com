package com.kao.omnicom.backend.jpa.converter;

import com.kao.omnicom.backend.jpa.entity.Role;

public class UserConverter {

    public static com.kao.omnicom.backend.dto.User toDTO(com.kao.omnicom.backend.jpa.entity.User entity) {
        AuthorityConverter converter = new AuthorityConverter();

        return com.kao.omnicom.backend.dto.User.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .password(entity.getPassword())
                .emailVerified(entity.isEmailVerified())
                .role(entity.getRoles().getName())
                .authorities(converter.convertToDatabaseColumn(entity.getRoles().getAuthorities()))
                .build();
    }

    public static com.kao.omnicom.backend.jpa.entity.User toEntity(com.kao.omnicom.backend.dto.User dto) {
        AuthorityConverter converter = new AuthorityConverter();

        return com.kao.omnicom.backend.jpa.entity.User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .roles(Role.builder()
                        .name(dto.getRole())
                        .authorities(converter.convertToEntityAttribute(dto.getAuthorities()))
                        .build())
                .emailVerified(dto.isEmailVerified())
                .loginAttempts(0)
                .accountLocked(false)
                .build();
    }

}
