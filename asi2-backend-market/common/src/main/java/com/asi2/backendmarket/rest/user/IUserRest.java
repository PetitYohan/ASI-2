package com.asi2.backendmarket.rest.user;

import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.IRest;
import com.asi2.backendmarket.dto.user.BalanceUserDto;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

public interface IUserRest extends IRest {

    public final String ROOT_PATH = "/api/user";
    public final String USER = ROOT_PATH + "/";
    public final String ID_PATH = ROOT_PATH + "/{id}";
    public final String LOGIN_PATH = ROOT_PATH + "/{login}";
    public final String GET_ALL = ROOT_PATH + "/users";
    public final String PROFILE = ROOT_PATH + "/profile";
    public final String BALANCE = ROOT_PATH + "/balance";

    @RequestMapping(PROFILE)
    public ResponseEntity<UserDto> getUserProfile();

    @RequestMapping(LOGIN_PATH)
    public ResponseEntity<UserDto> findByLogin(@PathVariable String login);

    @PostMapping(BALANCE)
    public ResponseEntity<Boolean> balanceUserMoney(@RequestBody BalanceUserDto userDto);

    @GetMapping(ID_PATH)
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id);

    @PostMapping(USER)
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto);

    @PutMapping(ID_PATH)
    public ResponseEntity<UserDto> updateUser(@PathVariable Integer id, @RequestBody UserDto userDto);

    @DeleteMapping(ID_PATH)
    public void deleteUser(@PathVariable Integer id);

    @GetMapping(GET_ALL)
    public List<UserDto> getAllUsers();
}
