package com.asi2.backendmarket.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.asi2.backendmarket.ESB.StoreMessage;
import com.asi2.backendmarket.ESB.Utils.Sender;
import com.asi2.backendmarket.dto.store.StoreAction;
import com.asi2.backendmarket.dto.store.StoreOrder;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;
import com.asi2.backendmarket.rest.store.IStoreRest;
import com.asi2.backendmarket.service.StoreService;


@RestController
public class StoreController implements IStoreRest {

	@Autowired
	StoreService storeService;

	@Autowired
	Sender sender;

	@Override
	public Boolean buyCard(StoreOrder order) {
		sender.sendMessage(new StoreMessage(order,StoreAction.BUY, null));
		return true;
	}

	@Override
	public Boolean sellCard(StoreOrder order) {
		sender.sendMessage(new StoreMessage(order,StoreAction.SELL, null));
		return true;
	}

	@Override
	public List<StoreTransactionDto> getAllCards() {
		return storeService.getAllTransactions();
	}

}
