package com.kao.omnicom.backend.services;

import com.kao.omnicom.backend.entity.OutputResponse;

import java.io.File;

public interface TerminalService {

    OutputResponse getOutput(byte[] input, String flags);

}
