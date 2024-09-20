package com.kao.omnicom.backend.jpa.repository;

import com.kao.omnicom.backend.jpa.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    Optional<Role> findByNameIgnoreCase(String name);

    boolean existsByName(String roleName);

}
