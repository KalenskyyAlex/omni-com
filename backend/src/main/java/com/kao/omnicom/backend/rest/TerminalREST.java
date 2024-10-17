package com.kao.omnicom.backend.rest;

import com.kao.omnicom.backend.dto.rest.OutputResponse;
import com.kao.omnicom.backend.dto.rest.TerminalRequest;
import com.kao.omnicom.backend.services.TerminalService;
import com.kao.omnicom.backend.services.impl.TerminalServiceDocker;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/terminal")
@CrossOrigin
public class TerminalREST {

    private final TerminalService terminalService = new TerminalServiceDocker();
    private final Logger logger = Logger.getLogger("TerminalREST");

    @PostMapping("/init")
    public OutputResponse getOutput(@RequestBody TerminalRequest input) {
        logger.log(Level.INFO, "Get Output request was called");
        OutputResponse response = new OutputResponse();

        if (!input.isUserInputUpdated()){
            return terminalService.getOutput(input.getCode().getBytes(), "");
        }

        response.setOutput("Wrong API call: user input expected, but init called");
        response.setWaitingForInput(false);
        return response;
    }

    @PostMapping("/provide-input")
    public OutputResponse provideInput(@RequestBody TerminalRequest input) {
        logger.log(Level.INFO, "Provide Input request was called");
        OutputResponse response = new OutputResponse();

        if (input.getContainerId() == null) {
            response.setOutput("Wrong API call: provide output called, no containerId specified");
            response.setWaitingForInput(false);
            return response;
        }

        if (input.isUserInputUpdated()){
            return terminalService.provideInput(input.getContainerId(), input.getUserInput());
        }

        response.setOutput("Wrong API call: no user input expected, but provide-input called");
        response.setWaitingForInput(false);
        return response;
    }

    @PostMapping("/interrupt")
    public OutputResponse interrupt(@RequestBody TerminalRequest input) {
        logger.log(Level.INFO, "Interrupt request was called");
        OutputResponse response = new OutputResponse();

        if (input.getContainerId() == null) {
            response.setOutput("Wrong API call: interrupt called, no containerId specified");
            response.setWaitingForInput(false);
            return response;
        }

        if (input.isInterruptNeeded()){
            return terminalService.interrupt(input.getContainerId());
        }

        response.setOutput("Wrong API call: no interruption needed, but interrupt called");
        response.setWaitingForInput(false);
        return response;
    }

}
