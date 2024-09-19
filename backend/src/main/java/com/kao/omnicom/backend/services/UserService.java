package com.kao.omnicom.backend.services;

import com.kao.omnicom.backend.jpa.entity.Role;
import com.kao.omnicom.backend.jpa.entity.User;

public interface UserService {

    void createUser(String username, String email, String password);

    Role getRole(String name);
}
