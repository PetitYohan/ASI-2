package com.asi2.backendmarket.service;

import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.user.UserRestConsumer;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;

public class AuthService {

    private static final UserRestConsumer userRestConsumer = new UserRestConsumer();
    public UserDto getUserByLogin(String login) {
        Optional<UserDto> user = Optional.of(userRestConsumer.findByLogin(login).getBody());
        if(user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    public String login(UserDto user, String password) {
        if(BCrypt.checkpw(password, user.getPwd())) {
            return createTokenFromUser(user);
        } else {
            return null;
        }
    }
    private String createTokenFromUser(UserDto user) {
        return Jwts.builder()
                .setIssuer("CardTrading")
                .setSubject(user.getEmail())
                .claim("fullName", user.getLastName() + " " + user.getSurName())
                .claim("scope", "user")
                .setIssuedAt(Date.from(Instant.ofEpochSecond(1466796822L)))
                .setExpiration(Date.from(Instant.ofEpochSecond(4622470422L)))
                .signWith(
                        SignatureAlgorithm.HS256,
                        TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=")
                )
                .compact();
    }
    public boolean isValidUserRegistration(UserDto user) {
        boolean isValid = true;
        if(this.isInDatabase(user)) {
            if(user.getLastName() == null || user.getLastName().isEmpty()) {
                isValid = false;
            }

            if(user.getSurName() == null || user.getSurName().isEmpty()) {
                isValid = false;
            }
        } else {
            isValid = false;
        }
        return isValid;
    }

    public boolean postUser(UserDto userDto){
        return userRestConsumer.postUser(userDto);
    }

    public boolean isInDatabase(UserDto user) {
        return userRestConsumer.findByLogin(user.getLogin()).getStatusCode().equals(HttpStatus.OK);
    }
    public String hashPassword(String pwd) {
        return BCrypt.hashpw(pwd, BCrypt.gensalt());
    }

}




