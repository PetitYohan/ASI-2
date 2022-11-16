package com.asi2.backendmarket.controller;

import com.asi2.backendmarket.dto.user.AuthDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    private final String ROOT_PATH = "/api/auth";

    @RequestMapping(value = ROOT_PATH + "/register", method=RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        userDto.setPwd(authService.hashPassword(userDto.getPwd()));
        if (authService.isLoginAvailable(userDto.getLogin())) {
            // Send response
            Boolean isRegistred = authService.registerUser(userDto);
            if (isRegistred) {
                return new ResponseEntity<>("User registred", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("An error has occured during creating cards for users", HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<String>("Bad request", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = ROOT_PATH + "/login", method=RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody AuthDto authDto) {
        UserDto user = authService.getUserByLogin(authDto.getUsername());

        if(user != null) {
            String token = authService.login(user, authDto.getPassword());

            if(token != null) {
                user.setToken(token);
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Authentification Failed", null);
    }
}
