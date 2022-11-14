package com.asi2.backendmarket.rest.user;

import com.asi2.backendmarket.dto.user.BalanceUserDto;
import com.asi2.backendmarket.dto.user.UserDto;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class UserRestConsumer implements IUserRest {

	private RestTemplate restTemplate = new RestTemplate();;

    @Override
    public ResponseEntity<UserDto> getUserProfile() {
        return restTemplate.getForEntity(PROFILE, UserDto.class);
    }

    @Override
    public ResponseEntity<UserDto> findByLogin(String login) {
        return restTemplate.getForEntity(LOGIN_PATH, UserDto.class, login);
    }

    @Override
    public ResponseEntity<Boolean> balanceUserMoney(BalanceUserDto userDto) {
        return restTemplate.postForEntity(BALANCE, userDto, Boolean.class);
    }

    @Override
    public ResponseEntity<UserDto> getUser(Integer id) {
        return restTemplate.getForEntity(ID_PATH, UserDto.class, id);
    }

    @Override
    public ResponseEntity<UserDto> addUser(UserDto userDto) {
        return restTemplate.getForEntity(USER_PATH, UserDto.class);
    }

    @Override
    public ResponseEntity<UserDto> updateUser(Integer id, UserDto userDto) {
        HttpEntity<UserDto> request = new HttpEntity<>(userDto);
        return restTemplate.postForEntity(ID_PATH, request, UserDto.class, id);        
    }

    @Override
    public void deleteUser(Integer id) {
        //TODO notify others
        restTemplate.delete(ID_PATH, id);
    }

    @Override
    public List<UserDto> getAllUsers() {
        UserDto[] users = restTemplate.getForEntity(GET_ALL, UserDto[].class).getBody();
        return Arrays.asList(users);
    }
}
