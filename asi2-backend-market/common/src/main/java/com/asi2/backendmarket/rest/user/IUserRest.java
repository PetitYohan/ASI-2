package com.asi2.backendmarket.rest.user;

import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.IRest;
import com.asi2.backendmarket.dto.user.BalanceUserDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public interface IUserRest extends IRest {
    public final String ROOT_PATH = "/api/users";

	public final String PROFILE = ROOT_PATH + "/profile";
	public final String BALANCE = ROOT_PATH + "/balance";

    
    @RequestMapping(PROFILE)
    public ResponseEntity<UserDto> getUserProfile();

    @PostMapping(BALANCE)
	public ResponseEntity<Boolean> balanceUserMoney(@RequestBody BalanceUserDto userDto);
}
