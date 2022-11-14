package com.asi2.backendmarket.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.model.StoreAction;
import com.asi2.backendmarket.model.StoreTransaction;
import com.asi2.backendmarket.rest.card.CardRestConsumer;
import com.asi2.backendmarket.rest.user.UserRestConsumer;
import com.asi2.backendmarket.repository.StoreRepository;;

@Service
public class StoreService {

	private final CardRestConsumer cardService;
	private final UserRestConsumer userService;
	private final StoreRepository storeRepository;

	public StoreService(CardRestConsumer cardService, UserRestConsumer userService, StoreRepository storeRepository) {
		this.cardService = cardService;
		this.userService = userService;
		this.storeRepository = storeRepository;
	}

	public boolean buyCard(Integer user_id, Integer card_id) {
		Optional<UserDto> u_option = userService.getUser(user_id);
		Optional<CardDto> c_option = cardService.getCard(card_id);
		if (!u_option.isPresent() || !c_option.isPresent()) {
			return false;
		}
		//TODO use rest consumer
		UserDto u = u_option.get();
		CardDto c = c_option.get();
		if (u.getAccount() > c.getPrice()) {
			u.addCard(c);
			u.setAccount(u.getAccount() - c.getPrice());
			userService.updateUser(u);
			StoreTransaction sT = new StoreTransaction(user_id, card_id, StoreAction.BUY);
			storeRepository.save(sT);
			return true;
		} else {
			return false;
		}
	}

	public boolean sellCard(Integer user_id, Integer card_id) {
		Optional<UserDto> u_option = userService.getUser(user_id);
		Optional<CardDto> c_option = cardService.getCard(card_id);
		if (!u_option.isPresent() || !c_option.isPresent()) {
			return false;
		}
		UserDto u = u_option.get();
		CardDto c = c_option.get();
		//TODO use rest consumer
		c.setUser(null);
		cardService.updateCard(c);
		u.setAccount(u.getAccount() + c.computePrice());
		userService.updateUser(u);
		StoreTransaction sT = new StoreTransaction(user_id, card_id, StoreAction.SELL);
		storeRepository.save(sT);
		return true;
	}

	public List<StoreTransaction> getAllTransactions() {
		List<StoreTransaction> sTList = new ArrayList<>();
		this.storeRepository.findAll().forEach(sTList::add);
		return sTList;

	}

}
