package com.asi2.backendmarket.ESB.Utils;

import com.asi2.backendmarket.ESB.UserMessage;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.model.UserModel;
import com.asi2.backendmarket.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class Receiver {

    @Autowired
    public UserService userService;


    @JmsListener(destination = "${spring-messaging.queue.name}")
    public void receiveMessage(UserMessage message) {
        log.info(message);
        for(UserDto user : message.getUserDtoList()){
            userService.updateUser(user);
        }

    }
}
