package com.kao.omnicom.backend.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "verification_tokens")
public class VerificationToken {

    @Id
    @Column(name="token_id", updatable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name="token", unique = true)
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
