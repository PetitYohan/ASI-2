package com.asi2.backendmarket.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.asi2.backendmarket.dto.store.StoreDto;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;
import com.asi2.backendmarket.dto.card.CardInstanceDto;

import com.asi2.backendmarket.model.Store;
import com.asi2.backendmarket.rest.store.IStoreRest;
import com.asi2.backendmarket.service.StoreService;

@RestController
public class StoreController implements IStoreRest {
	
	@Autowired
	StoreService storeService;

	@Autowired
	ModelMapper modelMapper;

	private StoreDto convertToStoreDto(Store store, CardInstanceDto card) {
		StoreDto storeDto = modelMapper.map(store, StoreDto.class);
		storeDto.setCardInstance(card);
	    return storeDto;
	}
	
	@Override
	public List<StoreDto> getAll() {
		return storeService.getAllStores()
			.entrySet()
			.stream()
			.map(entry -> convertToStoreDto(entry.getKey(), entry.getValue()))
			.collect(Collectors.toList());
	}

	@Override
	public void sellCard(@RequestBody StoreTransactionDto storeDto) {
		storeService.sell(storeDto.getIdUser(), storeDto.getIdCard(), storeDto.getPriceStore());
	}
	
	@Override
	public void buyCard(@RequestBody StoreTransactionDto storeDto) {
		storeService.buy(storeDto.getIdStore(), storeDto.getIdUser());
	}

}
