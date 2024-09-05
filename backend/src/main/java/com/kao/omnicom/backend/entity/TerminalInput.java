package com.kao.omnicom.backend.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TerminalInput {

    private String code;

    private String flags;

    private String userInput;

    private String containerId;

    private boolean userInputUpdated;

    private boolean interruptNeeded;

}
