package com.kao.omnicom.backend.events;

import com.kao.omnicom.backend.jpa.entity.User;
import com.kao.omnicom.backend.util.enumeration.Events;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class UserEvent {

    private User user;
    private Events type;
    private Map<?, ?> data;

}
