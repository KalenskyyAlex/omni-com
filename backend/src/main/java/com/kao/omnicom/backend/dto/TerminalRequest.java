package com.kao.omnicom.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TerminalRequest {

    private String code;

    private String flags;

    private String userInput;

    private String containerId;

    private boolean userInputUpdated;

    private boolean interruptNeeded;

}
