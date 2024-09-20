package com.kao.omnicom.backend.rest;

import com.kao.omnicom.backend.domain.UserRequest;
import com.kao.omnicom.backend.jpa.entity.User;
import com.kao.omnicom.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserREST {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody UserRequest user){
        userService.createUser(user.getUsername(), user.getEmail(), user.getPassword());

        return ResponseEntity.ok("Account created successfully. Check your email to enable your account");
    }

}
