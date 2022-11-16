package com.asi2.backendmarket.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.asi2.backendmarket.dto.store.StoreOrder;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;
import com.asi2.backendmarket.rest.store.IStoreRest;
import com.asi2.backendmarket.service.StoreService;

@CrossOrigin
@RestController
public class StoreController implements IStoreRest {

	@Autowired
	StoreService storeService;

	@Override
	public Boolean buyCard(StoreOrder order) {
		return storeService.buyCard(order.getUserId(), order.getCardId());
	}

	@Override
	public Boolean sellCard(StoreOrder order) {
		return storeService.sellCard(order.getUserId(), order.getCardId());
	}

	@Override
	public List<StoreTransactionDto> getAllCards() {
		return storeService.getAllTransactions();
	}

}
