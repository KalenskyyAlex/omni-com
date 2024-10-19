package com.kao.omnicom.backend.rest.auth;

import com.kao.omnicom.backend.dto.rest.StandardResponse;
import com.kao.omnicom.backend.dto.rest.UserRequest;
import com.kao.omnicom.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/verify")
public class VerifyREST {

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

    @GetMapping("/activate")
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

}
