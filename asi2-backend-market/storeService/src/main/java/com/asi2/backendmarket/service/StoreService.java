package com.asi2.backendmarket.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.model.StoreAction;
import com.asi2.backendmarket.model.StoreTransaction;
import com.asi2.backendmarket.rest.card.CardRestConsumer;
import com.asi2.backendmarket.rest.user.UserRestConsumer;
import com.asi2.backendmarket.repository.StoreRepository;;

@Service
public class StoreService {

	private static final CardRestConsumer cardRestConsumer = new CardRestConsumer();
	private static final UserRestConsumer userRestConsumer = new UserRestConsumer();

	@Autowired
	StoreRepository storeRepository;

	@Autowired
	ModelMapper mapper;

	public boolean buyCard(Integer userId, Integer cardId) {
		// TODO test mauvais res + quel msg de synchro avec esb ??
		UserDto u = userRestConsumer.getUser(userId).getBody();
		CardDto c = cardRestConsumer.getCard(cardId).getBody();
		if (u == null || c == null) {
			return false;
		}
		if (u.getAccount() > c.getPrice()) {
			c.setUserId(u.getIdUser());
			u.setAccount(u.getAccount() - c.getPrice());
			CardDto cardUpdateResult = cardRestConsumer.updateCard(c.getId(), c).getBody();
			UserDto userUpdateResult = userRestConsumer.updateUser(u.getIdUser(), u).getBody();
			StoreTransaction sT = new StoreTransaction(userId, cardId, StoreAction.BUY, c.getPrice());
			storeRepository.save(sT);
			return true;
		} else {
			return false;
		}
	}

	public boolean sellCard(Integer userId, Integer cardId) {
		UserDto u = userRestConsumer.getUser(userId).getBody();
		CardDto c = cardRestConsumer.getCard(cardId).getBody();
		if (u == null || c == null) {
			return false;
		}
		c.setUserId(null);
		u.setAccount(u.getAccount() + c.computePrice());
		cardRestConsumer.updateCard(c.getId(), c);
		userRestConsumer.updateUser(u.getIdUser(), u);
		StoreTransaction sT = new StoreTransaction(userId, cardId, StoreAction.SELL, c.computePrice());
		storeRepository.save(sT);
		return true;
	}

	public List<StoreTransactionDto> getAllTransactions() {
		List<StoreTransaction> sTList = new ArrayList<>();
		this.storeRepository.findAll().forEach(sTList::add);
		return sTList.stream()
				.map(entry -> mapper.map(entry, StoreTransactionDto.class))
				.collect(Collectors.toList());

	}

}
