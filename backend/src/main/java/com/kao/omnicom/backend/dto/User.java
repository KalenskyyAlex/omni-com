package com.kao.omnicom.backend.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    private String id;
    private String username;
    private String email;
    private String password;
    private boolean emailVerified = false;
    private boolean accountLocked = false;

    private String role;
    private String authorities;

}
