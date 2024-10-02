package com.kao.omnicom.backend.security.filter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

// For Firefox
// See https://stackoverflow.com/questions/50788695/cors-preflight-channel-did-not-succeed-only-in-firefox-chrome-works-fine
@ControllerAdvice
public class CORSFilter {

    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    @ResponseBody
    public ResponseEntity<Void> handle() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "*"); // Or specify allowed origin(s)
        headers.add("Access-Control-Allow-Methods", "*");
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        headers.add("Access-Control-Max-Age", "3600");
        headers.add("Cache-Control", "no-cache");

        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

}