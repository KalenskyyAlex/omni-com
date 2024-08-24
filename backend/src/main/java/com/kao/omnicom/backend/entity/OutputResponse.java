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

}
