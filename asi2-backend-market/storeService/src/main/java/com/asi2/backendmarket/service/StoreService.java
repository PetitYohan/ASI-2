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

	public boolean buyCard(Integer user_id, Integer card_id) {
		// TODO test mauvais res + quel msg de synchro avec esb ??
		UserDto u = userRestConsumer.getUser(user_id).getBody();
		CardDto c = cardRestConsumer.getCard(card_id).getBody();
		if (u == null || c == null) {
			return false;
		}
		if (u.getAccount() > c.getPrice()) {
			c.setUserId(u.getIdUser());
			cardRestConsumer.updateCard(c.getId(), c);
			u.setAccount(u.getAccount() - c.getPrice());
			userRestConsumer.updateUser(u.getIdUser(), u);
			StoreTransaction sT = new StoreTransaction(user_id, card_id, StoreAction.BUY);
			storeRepository.save(sT);
			return true;
		} else {
			return false;
		}
	}

	public boolean sellCard(Integer user_id, Integer card_id) {
		UserDto u = userRestConsumer.getUser(user_id).getBody();
		CardDto c = cardRestConsumer.getCard(card_id).getBody();
		if (u == null || c == null) {
			return false;
		}
		c.setUserId(null);
		cardRestConsumer.updateCard(c.getId(), c);
		u.setAccount(u.getAccount() + c.computePrice());
		userRestConsumer.updateUser(u.getIdUser(), u);
		StoreTransaction sT = new StoreTransaction(user_id, card_id, StoreAction.SELL);
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
