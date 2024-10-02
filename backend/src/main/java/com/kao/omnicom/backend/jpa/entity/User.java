package com.kao.omnicom.backend.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import static jakarta.persistence.FetchType.EAGER;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="user_id", updatable = false, unique = true)
    private String id;

    @NotNull
    @Column(name="username", nullable = false)
    private String username;

    @NotNull
    @Column(name="email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Column(name="password", nullable = false)
    private String password;

    @NotNull
    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "role_id")
    private Role roles;

    @NotNull
    @Column(name="email_verified", nullable = false)
    private boolean emailVerified = false;

    @NotNull
    @Column(name="login_attempts", nullable = false)
    private int loginAttempts = 0;

    @NotNull
    @Column(name="account_locked", nullable = false)
    private boolean accountLocked = false;

}
