package com.asi2.backendmarket.service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import com.asi2.backendmarket.dto.card.CardInstanceDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Optional;

import com.asi2.backendmarket.repository.UserRepository;
import com.asi2.backendmarket.rest.card.CardRestConsumer;
import com.asi2.backendmarket.rest.user.UserRestConsumer;

import org.mindrot.jbcrypt.BCrypt;

import java.net.URL;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;

@Service
public class UserService {
	CardRestConsumer cardRestConsumer;

	@Autowired
	UserRepository userRepository;

	@Autowired
	private HttpServletRequest request;

	@PostConstruct
	void initConsumer() {
		cardRestConsumer = new CardRestConsumer();
	}

	public Boolean addUser(UserDto user) {
		user.setAccount(1000.0F);
		UserModel userModel = fromUDtoToUModel(user);
		userRepository.save(userModel);
		System.out.println("User created : " + userModel.getEmail());
		
		// get five card 
		//cardInstanceService.giveCardsToNewUser(user);
		System.out.println("TODO: Give card to user !");
		try {
			List<CardInstanceDto> cards = cardRestConsumer.generateCardsForNewUser(userModel.getId()).getBody();
			return cards.size() != 0;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	public UserDto updateUser(UserDto user) {
		UserModel u = fromUDtoToUModel(user);
		UserModel uBd =userRepository.save(u);
		return fromUserModelToUserDTO(uBd);
	}
	public void deleteUser(String id) {
		userRepository.deleteById(Integer.valueOf(id));
	}
	
	public boolean isInDatabase(UserModel user) {
		Optional<UserModel> userFind = userRepository.findByEmailUser(user.getEmail());
		return userFind.isPresent();
	}
	
	public boolean isValidUserRegistration(UserModel user) {
		boolean isValid = true;
		if(!this.isInDatabase(user)) {
		
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
	
	public String login(UserModel user, String password) {
		if(BCrypt.checkpw(password, user.getPwd())) {
			return createTokenFromUser(user);
		} else {
			return null;
		}
    }

	public UserModel getUserByLogin(String login) {
		Optional<UserModel> user = userRepository.findByLoginUser(login);
		if(user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}
	public UserModel getUserByEmail(String email) {
		Optional<UserModel> user = userRepository.findByEmailUser(email);
		if(user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}
	
	public Optional<UserModel> getRequestUser() {
		String authToken = request.getHeader("Authorization");
		
		if(authToken == null || authToken.isEmpty()) {			
			return Optional.empty();
		}
		
		String email = Jwts.parser()
				.setSigningKey(TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E="))
				.parseClaimsJws(authToken.replace("Bearer ", ""))
				.getBody()
				.getSubject();
		
		return Optional.of(getUserByEmail(email));
	}
	
	public UserModel getUserById(int id) {
		Optional<UserModel> user = userRepository.findById(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}
	
	public Boolean changeMoneyOfUser(UserModel user,float balancedMoney) {
		try {
			float oldMoney = user.getAccount();
			float newMoney = oldMoney + balancedMoney;
			if (newMoney >= 0) {
				user.setAccount(newMoney);
				userRepository.save(user);
				return true;
			} else {
				return false;
			}

		} catch (Exception e) {
			return false;
		}
	}
	
	private String createTokenFromUser(UserModel user) {
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

	public List<UserModel> getAllUsers() {
		List<UserModel> userList = new ArrayList<>();
		userRepository.findAll().forEach(userList::add);
		return userList;
	}

	private UserModel fromUDtoToUModel(UserDto user) {
		UserModel u = new UserModel(user);
		return u;
	}

	public static UserDto fromUserModelToUserDTO(UserModel uM) {
		UserDto userDto = new UserDto();
		userDto.setIdUser(uM.getId());
		userDto.setLogin(uM.getLogin());
		userDto.setPwd(uM.getPwd());
		userDto.setAccount(uM.getAccount());
		userDto.setLastName(uM.getLastName());
		userDto.setSurName(uM.getSurName());
		userDto.setEmail(uM.getEmail());
		return userDto;
	}

}
