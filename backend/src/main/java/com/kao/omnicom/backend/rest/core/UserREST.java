package com.kao.omnicom.backend.rest.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kao.omnicom.backend.dto.User;
import com.kao.omnicom.backend.dto.rest.MatcherRequest;
import com.kao.omnicom.backend.dto.rest.StandardResponse;
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
