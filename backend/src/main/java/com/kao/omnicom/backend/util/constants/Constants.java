package com.kao.omnicom.backend.util.constants;

public class Constants {

    public final static String AUTHORITY_DELIMITER = ",";
    public final static String AUTHORITIES = "authorities";
    public final static String ROLE_PREFIX = "ROLE_";
    public final static String ROLE = "role";

    public final static String USER_AUTHORITIES = "script:create,script:read,script:update,script:delete,own:update";
    public final static String ADMIN_AUTHORITIES = "script:delete,user:read,user:update,own:update";
    public final static String MASTER_ADMIN_AUTHORITIES = "script:delete,user:create,user:read,user:update,user:delete,own:update";

}
