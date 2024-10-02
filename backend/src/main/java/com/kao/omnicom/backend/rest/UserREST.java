package com.kao.omnicom.backend.rest;

import com.kao.omnicom.backend.dto.UserRequest;
import com.kao.omnicom.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/account/verify")
    public ResponseEntity<String> verifyAccount(@RequestParam("token") String token){
        boolean validatedSuccessful = userService.validateAccount(token);

        if (validatedSuccessful){
            return ResponseEntity.ok("Account verified successfully. You can close this page");
        }

        return ResponseEntity.ok("An error occurred. Contact support");
    }

}
