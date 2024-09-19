package com.kao.omnicom.backend.jpa.entity;

import com.kao.omnicom.backend.util.enumeration.Authorities;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="role_id", updatable = false, unique = true)
    private String id;

    @NotNull
    @Column(name="name", unique = true)
    private String name;

    @NotNull
    @Column(name="authorities")
    private Authorities authorities;

}
