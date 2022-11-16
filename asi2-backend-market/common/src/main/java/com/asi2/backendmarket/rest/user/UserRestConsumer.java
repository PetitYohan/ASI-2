package com.asi2.backendmarket.rest.user;

import com.asi2.backendmarket.dto.user.UserDto;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class UserRestConsumer implements IUserRest {

	private RestTemplate restTemplate = new RestTemplate();;

    @Override
    public ResponseEntity<UserDto> getUserProfile() {
        return restTemplate.getForEntity(BASE_PATH + PROFILE, UserDto.class);
    }

    @Override
    public ResponseEntity<UserDto> getUserByLogin(String login) {
        return restTemplate.getForEntity(BASE_PATH + LOGIN_PATH, UserDto.class, login);
    }

    @Override
    public ResponseEntity<UserDto> getUser(Integer id) {
        return restTemplate.getForEntity(BASE_PATH + ID_PATH, UserDto.class, id);
    }

    @Override
    public ResponseEntity<UserDto> addUser(UserDto userDto) {
        return restTemplate.postForEntity(BASE_PATH + USER, userDto, UserDto.class);
    }

    @Override
    public ResponseEntity<UserDto> updateUser(Integer id, UserDto userDto) {
        HttpEntity<UserDto> request = new HttpEntity<>(userDto);
        return restTemplate.exchange(BASE_PATH + ID_PATH, HttpMethod.PUT, request, UserDto.class, id);
    }

    @Override
    public void deleteUser(Integer id) {
        //TODO notify others
        restTemplate.delete(BASE_PATH + ID_PATH, id);
    }

    @Override
    public List<UserDto> getAllUsers() {
        UserDto[] users = restTemplate.getForEntity(BASE_PATH + GET_ALL, UserDto[].class).getBody();
        return Arrays.asList(users);
    }
}
