package com.asi2.backendmarket.service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import com.asi2.backendmarket.repository.UserRepository;
import com.asi2.backendmarket.rest.card.CardRestConsumer;
import com.asi2.backendmarket.rest.user.UserRestConsumer;

import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;

import java.net.URL;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;

@Service
public class UserService {

	private CardRestConsumer cardRestConsumer;

	@Autowired
	UserRepository userRepository;

	@Autowired
	ModelMapper mapper;

	@Autowired
	private HttpServletRequest request;

	@PostConstruct
	void initConsumer() {
		cardRestConsumer = new CardRestConsumer();
	}

	public UserDto addUser(UserDto user) {
		user.setAccount(1000.0F);
		UserModel userModel = fromUDtoToUModel(user);
		userRepository.save(userModel);
		System.out.println("User created : " + userModel.getEmail());

		// get five card
		// cardInstanceService.giveCardsToNewUser(user);
		try {
			List<CardDto> cards = new ArrayList<CardDto>();// cardRestConsumer.generateCardsForNewUser(userModel.getId()).getBody();
			return user;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public UserDto updateUser(Integer id, UserDto user) {
		if (id != user.getIdUser()) {
			return null;
		} else if (!userRepository.existsById(id)) {
			return null;
		} else {
			UserModel u = mapper.map(user, UserModel.class);
			UserModel uBd = userRepository.save(u);
			return mapper.map(uBd, UserDto.class);
		}
	}

	public void deleteUser(Integer id) {
		userRepository.deleteById(Integer.valueOf(id));
	}

	public UserDto getUserByLogin(String login) {
		Optional<UserModel> user = userRepository.findByLogin(login);
		if (user.isPresent()) {
			return mapper.map(user.get(), UserDto.class);
		} else {
			return null;
		}
	}

	public UserDto getUserByEmail(String email) {
		Optional<UserModel> user = userRepository.findByEmail(email);
		if (user.isPresent()) {
			return mapper.map(user.get(), UserDto.class);
		} else {
			return null;
		}
	}

	// TODO move to common to be used by any service
	public Optional<UserDto> getRequestUser() {
		String authToken = request.getHeader("Authorization");

		if (authToken == null || authToken.isEmpty()) {
			return Optional.empty();
		}

		String email = Jwts.parser()
				.setSigningKey(TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E="))
				.parseClaimsJws(authToken.replace("Bearer ", ""))
				.getBody()
				.getSubject();

		return Optional.of(getUserByEmail(email));
	}

	public UserDto getUserById(int id) {
		Optional<UserModel> user = userRepository.findById(id);
		if (user.isPresent()) {
			return mapper.map(user.get(), UserDto.class);
		} else {
			return null;
		}
	}

	public Boolean changeMoneyOfUser(Integer userId, float balancedMoney) {

		Optional<UserModel> u = userRepository.findById(userId);
		if (!u.isPresent()) {
			return false;
		} else {
			UserModel user = u.get();
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
	}

	public List<UserDto> getAllUsers() {
		List<UserModel> userList = new ArrayList<>();
		userRepository.findAll().forEach(userList::add);
		return userList
				.stream()
				.map(entry -> mapper.map(entry, UserDto.class))
				.collect(Collectors.toList());
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
