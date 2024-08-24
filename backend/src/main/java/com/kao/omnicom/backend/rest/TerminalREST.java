package com.kao.omnicom.backend.rest;

import com.kao.omnicom.backend.entity.OutputResponse;
import com.kao.omnicom.backend.entity.TerminalInput;
import com.kao.omnicom.backend.services.TerminalService;
import com.kao.omnicom.backend.services.impl.TerminalServiceDocker;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/terminal")
@CrossOrigin
public class TerminalREST {

    TerminalService terminalService = new TerminalServiceDocker();

    @PostMapping("/init")
    public OutputResponse getOutput(@RequestBody TerminalInput input) {
        OutputResponse response = new OutputResponse();

        if (!input.isUserInputUpdated()){
            return terminalService.getOutput(input.getCode().getBytes(), "");
        }

        response.setOutput("Wrong API call: user input expected, but init called");
        response.setWaitingForInput(false);
        return response;
    }

    @PostMapping("/provide-input")
    public OutputResponse provideInput(@RequestBody TerminalInput input) {
        OutputResponse response = new OutputResponse();

        if (input.isUserInputUpdated()){
            return terminalService.provideInput(input.getContainerId(), input.getUserInput());
        }

        response.setOutput("Wrong API call: no user input expected, but provide-input called");
        response.setWaitingForInput(false);
        return response;
    }

    @PostMapping("/interrupt")
    public OutputResponse interrupt(@RequestBody TerminalInput input) {
        OutputResponse response = new OutputResponse();

        if (input.isInterruptNeeded()){
            return terminalService.interrupt(input.getContainerId());
        }

        response.setOutput("Wrong API call: no interruption needed, but interrupt called");
        response.setWaitingForInput(false);
        return response;
    }

}
