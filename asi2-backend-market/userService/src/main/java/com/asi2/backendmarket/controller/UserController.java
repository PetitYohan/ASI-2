package com.asi2.backendmarket.controller;

import com.asi2.backendmarket.model.UserModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.asi2.backendmarket.dto.user.BalanceUserDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.user.IUserRest;
import com.asi2.backendmarket.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController implements IUserRest {
	@Autowired
	UserService userService;
	
	@Autowired
	ModelMapper modelMapper;
	public UserController(UserService userService) {
		this.userService=userService;
	}
	@RequestMapping(method=RequestMethod.DELETE,value="/user/{id}")
	public void deleteUser(@PathVariable String id) {
		userService.deleteUser(id);
	}
	
	@Override
	@ResponseBody
	public ResponseEntity<UserDto> getUserProfile() {
		Optional<UserModel> currentUser = userService.getRequestUser();
		if(currentUser.isPresent()) {
			UserDto profilUserDto = modelMapper.map(currentUser, UserDto.class);
			return new ResponseEntity<UserDto>(profilUserDto, HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<UserDto> getUser(Integer id) {
		UserModel user = userService.getUserById(id);
		if(user != null) {
			return new ResponseEntity<UserDto>(userService.fromUserModelToUserDTO(user), HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public Boolean postUser(UserDto userDto) {
		return userService.addUser(userDto);
	}

	@Override
	public ResponseEntity<UserDto> findByLogin(String login) {
		UserModel user = userService.getUserByLogin(login);
		if(user != null) {
			return new ResponseEntity<UserDto>(userService.fromUserModelToUserDTO(user), HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(method=RequestMethod.GET,value="/users")
	private List<UserDto> getAllUsers() {
		List<UserDto> uDTOList=new ArrayList<UserDto>();
		for(UserModel uM: userService.getAllUsers()){
			uDTOList.add(userService.fromUserModelToUserDTO(uM));
		}
		return uDTOList;

	}
	@PutMapping(value="/user/{id}")
	public UserDto updateUser(@RequestBody UserDto user,@PathVariable String id) {
		user.setIdUser(Integer.valueOf(id));
		return userService.updateUser(user);
	}
	
	@Override
	@ResponseBody
	public ResponseEntity<Boolean> balanceUserMoney(@RequestBody BalanceUserDto userDto) {
		UserModel user = userService.getUserById(userDto.getIdUser());
		
		Boolean isMoneyChange = userService.changeMoneyOfUser(user, userDto.getBalanceMoney());
		
	    if (isMoneyChange) {
	    	return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	    } else {
	    	return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
	    }
	}


}
