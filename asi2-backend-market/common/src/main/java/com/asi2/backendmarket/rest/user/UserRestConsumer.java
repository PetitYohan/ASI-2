package com.asi2.backendmarket.rest.user;

import com.asi2.backendmarket.dto.user.BalanceUserDto;
import com.asi2.backendmarket.dto.user.UserDto;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class UserRestConsumer implements IUserRest {

	private RestTemplate restTemplate = new RestTemplate();;

    @Override
    public ResponseEntity<UserDto> getUserProfile() {
        return restTemplate.getForEntity(BASE_PATH + PROFILE, UserDto.class);
    }

    @Override
    public ResponseEntity<UserDto> getUser(Integer id) {
        return restTemplate.getForEntity(BASE_PATH + ROOT_PATH + "/{" + id + "}", UserDto.class);
    }

    @Override
    public Boolean postUser(UserDto userDto) {
        System.out.println("New User_______________________________\n");
        System.out.println(restTemplate + BASE_PATH + ROOT_PATH + userDto + Boolean.class);
        System.out.println("New User_______________________________\n");
        return restTemplate.postForEntity(BASE_PATH +ROOT_PATH, userDto, Boolean.class).getBody();
    }

    @Override
    public ResponseEntity<UserDto> findByLogin(String login) {
        return restTemplate.getForEntity(BASE_PATH + ROOT_PATH + "/{" + login + "}", UserDto.class);
    }

    @Override
    public ResponseEntity<Boolean> balanceUserMoney(BalanceUserDto userDto) {
        System.out.println("Consumer_______________________________\n");
		System.out.println(restTemplate + BASE_PATH + BALANCE + userDto + Boolean.class);
		System.out.println("Consumer_______________________________\n");
        return restTemplate.postForEntity(BASE_PATH + BALANCE, userDto, Boolean.class);
    }
}
