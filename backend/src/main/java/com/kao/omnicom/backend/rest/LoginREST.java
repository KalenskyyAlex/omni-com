package com.kao.omnicom.backend.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatusCode;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoginREST {

    @GetMapping
    public ResponseEntity<String> login() {
        return new ResponseEntity<>("Success", HttpStatusCode.valueOf(200));
    }

}
