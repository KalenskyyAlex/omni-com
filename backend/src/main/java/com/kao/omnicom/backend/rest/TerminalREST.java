package com.kao.omnicom.backend.rest;

import com.kao.omnicom.backend.entity.OutputResponse;
import com.kao.omnicom.backend.entity.TerminalInput;
import com.kao.omnicom.backend.services.TerminalService;
import com.kao.omnicom.backend.services.impl.TerminalServiceDocker;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/terminal")
@CrossOrigin
public class TerminalREST {

    TerminalService terminalService = new TerminalServiceDocker();

    @PostMapping("/output")
    public OutputResponse getOutput(@RequestBody TerminalInput input) {
        if (!input.isUserInputUpdated()){
            return terminalService.getOutput(input.getCode().getBytes(), "");
        }
        else{
            return null; // TODO
        }
    }

}
