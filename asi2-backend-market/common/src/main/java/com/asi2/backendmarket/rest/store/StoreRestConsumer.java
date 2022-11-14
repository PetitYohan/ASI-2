package com.asi2.backendmarket.rest.store;

import java.util.List;

import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.asi2.backendmarket.rest.store.IStoreRest;
import com.asi2.backendmarket.dto.store.StoreOrder;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;

public class StoreRestConsumer implements IStoreRest {

	private final static Logger LOG = LoggerFactory.getLogger(StoreRestConsumer.class);

	private RestTemplate restTemplate = new RestTemplate();

	@Override
	public boolean buyCard(StoreOrder orderDto) {
		return restTemplate.postForObject(BUY, orderDto, Boolean.class);
	}

	@Override
	public boolean sellCard(StoreOrder orderDto) {
		return restTemplate.postForObject(SELL, orderDto, Boolean.class);
	}

	@Override
	public List<StoreTransactionDto> getAllCards() {
		return (List<StoreTransactionDto>) restTemplate.getForEntity(SELL, StoreTransactionDto[].class);
	}

}
