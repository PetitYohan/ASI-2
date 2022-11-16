package com.asi2.backendmarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.asi2.backendmarket.ESB.UserMessage;
import com.asi2.backendmarket.ESB.Utils.Sender;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.user.IUserRest;
import com.asi2.backendmarket.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController implements IUserRest {

	@Autowired
	UserService userService;

	@Autowired
	Sender sender;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@Override
	public ResponseEntity<UserDto> getUser(Integer id) {
		UserDto user = userService.getUserById(id);
		if (user != null) {
			return new ResponseEntity<UserDto>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}

	}

	@Override
	public ResponseEntity<UserDto> addUser(UserDto userDto) {
		UserDto addedUser = userService.addUser(userDto);
		if (addedUser != null) {
			return new ResponseEntity<UserDto>(addedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}

	}

	@Override
	public ResponseEntity<UserDto> updateUser(Integer id, UserDto userDto) {
		sender.sendMessage(new UserMessage(userDto, id, null));
		return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);	
	}

	@Override
	public void deleteUser(Integer id) {
		userService.deleteUser(id);
	}

	@Override
	public List<UserDto> getAllUsers() {
		return userService.getAllUsers();
	}

	@ResponseBody
	public ResponseEntity<UserDto> getUserProfile() {
		Optional<UserDto> currentUser = userService.getRequestUser();
		if (currentUser.isPresent()) {
			return new ResponseEntity<UserDto>(currentUser.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<UserDto> getUserByLogin(String login) {
		UserDto user = userService.getUserByLogin(login);
		if (user != null) {
			return new ResponseEntity<UserDto>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}
	}

}
