package com.asi2.backendmarket.rest.store;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import com.asi2.backendmarket.rest.store.IStoreRest;
import com.asi2.backendmarket.dto.StoreDto;
import com.asi2.backendmarket.dto.StoreTransactionDto;

public class StoreRestConsumer implements IStoreRest {
    
	private final static Logger LOG = LoggerFactory.getLogger(StoreRestConsumer.class);

	private RestTemplate restTemplate = new RestTemplate();
	
	@Override
	public List<StoreDto> getAll() {
		return (List<StoreDto>) restTemplate.getForEntity(GET_ALL, StoreDto[].class);
	}

	@Override
	public void buyCard(StoreTransactionDto storeDto) {
		restTemplate.postForEntity(BUY, storeDto, null);		
	}

	@Override
	public void sellCard(StoreTransactionDto storeDto) {
		restTemplate.postForEntity(SELL, storeDto, null);
	}

}
