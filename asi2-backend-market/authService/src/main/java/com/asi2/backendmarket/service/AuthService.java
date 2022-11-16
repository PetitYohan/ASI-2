package com.asi2.backendmarket.service;

import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.user.UserRestConsumer;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class AuthService {

    private static final UserRestConsumer userRestConsumer = new UserRestConsumer();

    public UserDto getUserByLogin(String login) {
        return userRestConsumer.getUserByLogin(login).getBody();
    }

    public String login(UserDto user, String password) {
        if (BCrypt.checkpw(password, user.getPwd())) {
            return createTokenFromUser(user);
        } else {
            return null;
        }
    }

    private String createTokenFromUser(UserDto user) {
        return Jwts.builder()
                .setIssuer("ASI2-backend-service")
                .setSubject(user.getEmail())
                .claim("fullName", user.getLastName() + " " + user.getSurName())
                .claim("scope", "user")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(24, ChronoUnit.HOURS)))
                .signWith(
                        SignatureAlgorithm.HS256,
                        TextCodec.BASE64.decode("QWxsIHdvcmsgYW5kIG5vIHBsYXkgbWFrZXMgSmFjayBhIGR1bGwgYm95Cg=="))
                .compact();
    }

    public boolean registerUser(UserDto userDto) {
        return userRestConsumer.addUser(userDto).getStatusCode().equals(HttpStatus.OK);
    }

    public boolean isLoginAvailable(String login) {
        try {
            return !userRestConsumer.getUserByLogin(login).getStatusCode().equals(HttpStatus.OK);
        } catch (HttpClientErrorException.BadRequest e) {
            return true;
        }
    }

    public String hashPassword(String pwd) {
        return BCrypt.hashpw(pwd, BCrypt.gensalt());
    }

}
