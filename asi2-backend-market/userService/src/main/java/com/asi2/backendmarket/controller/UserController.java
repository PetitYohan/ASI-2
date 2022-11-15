package com.asi2.backendmarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.asi2.backendmarket.dto.user.BalanceUserDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.user.IUserRest;
import com.asi2.backendmarket.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController implements IUserRest {
	
	@Autowired
	UserService userService;

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
		UserDto updatedUser = userService.updateUser(id, userDto);
		if (updatedUser != null) {
			return new ResponseEntity<UserDto>(updatedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}

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

	public ResponseEntity<UserDto> findByLogin(String login) {
		UserDto user = userService.getUserByLogin(login);
		if (user != null) {
			return new ResponseEntity<UserDto>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}
	}

	@ResponseBody
	public ResponseEntity<Boolean> balanceUserMoney(@RequestBody BalanceUserDto userDto) {

		Boolean isMoneyChange = userService.changeMoneyOfUser(userDto.getIdUser(), userDto.getBalanceMoney());

		if (isMoneyChange) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
	}

}
