package com.kao.omnicom.backend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.dto.rest.MatcherRequest;
import com.kao.omnicom.backend.dto.rest.StandardResponse;
import com.kao.omnicom.backend.dto.rest.UserRequest;
import com.kao.omnicom.backend.jpa.converter.UserConverter;
import com.kao.omnicom.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserREST {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<StandardResponse> saveUser(@RequestBody UserRequest user, HttpServletRequest request) {
        userService.createUser(user.getUsername(), user.getEmail(), user.getPassword());

        StandardResponse response = StandardResponse.getResponse(request,
                null,
                "Account created successfully. Check your email to enable your account",
                HttpStatus.OK);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/account/verify")
    public ResponseEntity<StandardResponse> verifyAccount(@RequestParam("token") String token, HttpServletRequest request) {
        boolean validatedSuccessful = userService.validateAccount(token);

        if (validatedSuccessful){
            return ResponseEntity.ok(StandardResponse.getResponse(request,
                    null,
                    "Account verified successfully. You can close this page",
                    HttpStatus.OK));
        }

        return ResponseEntity.ok(StandardResponse.getResponse(request,
                null,
                "An error occurred. Contact support",
                HttpStatus.OK));
    }

    @PostMapping("/by-email")
    public ResponseEntity<StandardResponse> findByEmail(@RequestBody MatcherRequest email, HttpServletRequest request) {
        User user = UserConverter.toDTO(userService.getUserByEmail(email.getMatcher()));

        StandardResponse response = StandardResponse.getResponse(request,
                new ObjectMapper().convertValue(user, Map.class),
                "OK",
                HttpStatus.OK);

        return ResponseEntity.ok(response);
    }

}
