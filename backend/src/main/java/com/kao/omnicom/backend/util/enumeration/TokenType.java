package com.kao.omnicom.backend.util.enumeration;

import lombok.Getter;

@Getter
public enum TokenType {

    ACCESS("access-token"),
    REFRESH("refresh-token");

    private final String name;

    TokenType(String name) {
        this.name = name;
    }

}
