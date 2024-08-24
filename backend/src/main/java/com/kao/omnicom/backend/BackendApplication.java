package com.kao.omnicom.backend;

import com.kao.omnicom.backend.entity.OutputResponse;
import com.kao.omnicom.backend.services.TerminalService;
import com.kao.omnicom.backend.services.impl.TerminalServiceDocker;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
