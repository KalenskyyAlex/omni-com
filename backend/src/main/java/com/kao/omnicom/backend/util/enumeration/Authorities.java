package com.kao.omnicom.backend.util.enumeration;

import static com.kao.omnicom.backend.util.constants.Constants.USER_AUTHORITIES;
import static com.kao.omnicom.backend.util.constants.Constants.ADMIN_AUTHORITIES;
import static com.kao.omnicom.backend.util.constants.Constants.MASTER_ADMIN_AUTHORITIES;

public enum Authorities {
    USER(USER_AUTHORITIES),
    ADMIN(ADMIN_AUTHORITIES),
    MASTER_ADMIN(MASTER_ADMIN_AUTHORITIES);

    final String value;

    Authorities(String value) {
        this.value = value;
    }

    public String getValue() { return value; }
}
