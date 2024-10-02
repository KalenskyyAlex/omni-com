package com.kao.omnicom.backend.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OutputResponse {

    private String output = "";

    private String error = "";

    private boolean isWaitingForInput = false;

    private boolean retry = false;

    private String containerId = ""; // container that is responsible for executing this concrete code;
    // needed for providing user input

    public void copy(OutputResponse og) {
        output = og.getOutput();
        isWaitingForInput = og.isWaitingForInput();
        containerId = og.getContainerId();
        error = og.getError();
    }

}
