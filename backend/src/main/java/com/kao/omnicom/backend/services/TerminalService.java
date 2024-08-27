package com.kao.omnicom.backend.services;

import com.kao.omnicom.backend.entity.OutputResponse;

public interface TerminalService {

    OutputResponse getOutput(byte[] input, String flags);

    OutputResponse provideInput(String containerId, String userInput);

    String interrupt(String containerId);
}
