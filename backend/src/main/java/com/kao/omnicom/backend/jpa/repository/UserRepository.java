package com.kao.omnicom.backend.jpa.repository;

import com.kao.omnicom.backend.jpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> { }
