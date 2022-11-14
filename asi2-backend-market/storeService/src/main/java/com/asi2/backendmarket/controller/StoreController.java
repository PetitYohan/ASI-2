package com.asi2.backendmarket.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.asi2.backendmarket.dto.store.StoreOrder;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;
import com.asi2.backendmarket.dto.card.CardInstanceDto;
import com.asi2.backendmarket.model.StoreTransaction;
import com.asi2.backendmarket.rest.store.IStoreRest;
import com.asi2.backendmarket.service.StoreService;

@RestController
public class StoreController implements IStoreRest {
	
	@Autowired
	StoreService storeService;

	@Autowired
	ModelMapper modelMapper;

	private StoreTransactionDto convertToStoreTransactionDto(StoreTransaction store) {
		StoreTransactionDto storeTransactionDto = modelMapper.map(store, StoreTransactionDto.class);
	    return storeTransactionDto;
	}

	@Override
	public boolean buyCard(StoreOrder order) {
		return storeService.sellCard(order.getUser_id(), order.getCard_id());
	}

	@Override
	public boolean sellCard(StoreOrder order) {
		return storeService.buyCard(order.getUser_id(), order.getCard_id());
	}

	@Override
	public List<StoreTransactionDto> getAllCards() {
		return storeService.getAllTransactions()
			.stream()
			.map(entry -> convertToStoreTransactionDto(entry))
			.collect(Collectors.toList());
	}
	
	
}
