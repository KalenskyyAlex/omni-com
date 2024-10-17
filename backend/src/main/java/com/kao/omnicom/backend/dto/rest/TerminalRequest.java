package com.kao.omnicom.backend.dto.rest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class TerminalRequest {

    private String code;

    private String flags;

    private String userInput;

    private String containerId;

    private boolean userInputUpdated;

    private boolean interruptNeeded;

}
