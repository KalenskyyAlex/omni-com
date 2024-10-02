package com.kao.omnicom.backend.services;

import com.kao.omnicom.backend.dto.OutputResponse;

public interface TerminalService {

    OutputResponse getOutput(byte[] input, String flags);

    OutputResponse provideInput(String containerId, String userInput);

    OutputResponse interrupt(String containerId);
}
