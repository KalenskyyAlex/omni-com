package com.kao.omnicom.backend.services;

import com.kao.omnicom.backend.jpa.entity.Role;
import com.kao.omnicom.backend.jpa.entity.User;
import com.kao.omnicom.backend.util.enumeration.LoginType;

public interface UserService {

    void createUser(String username, String email, String password);

    Role getRole(String name);

    boolean validateAccount(String token);

    void updateLoginAttempt(String email, LoginType loginType);

}
