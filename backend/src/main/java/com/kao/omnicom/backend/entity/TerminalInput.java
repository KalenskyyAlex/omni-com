package com.kao.omnicom.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TerminalInput {

    private String code;

    private String flags;

    private String userInput;

    private boolean isUserInputUpdated;

}
