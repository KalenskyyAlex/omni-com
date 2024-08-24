package com.kao.omnicom.backend.entity;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OutputResponse {

    @Getter
    @Setter
    private String output = "";

    @Getter
    @Setter
    private boolean isWaitingForInput = false;

}
