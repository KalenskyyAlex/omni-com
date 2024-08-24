package com.kao.omnicom.backend.entity;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OutputResponse {

    private String output = "";

    private boolean isWaitingForInput = false;

    private String containerId = ""; // container that is responsible for executing this concrete code;
    // needed for providing user input

    public void copy(OutputResponse og) {
        output = og.getOutput();
        isWaitingForInput = og.isWaitingForInput();
        containerId = og.getContainerId();
    }

}
