package com.asi2.backendmarket.rest.store;

import java.util.List;

import com.asi2.backendmarket.dto.store.StoreDto;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.asi2.backendmarket.rest.IRest;

public interface IStoreRest extends IRest {
	public final String ROOT_PATH = "/api/stores";

	public final String GET = ROOT_PATH + "/{id}";
	public final String GET_ALL = ROOT_PATH + "/";

	public final String BUY = ROOT_PATH + "/buy";
	public final String SELL = ROOT_PATH + "/sell";

	@GetMapping(GET_ALL)
	public List<StoreDto> getAll();

	@PostMapping(BUY)
	public void buyCard(@RequestBody StoreTransactionDto storeDto);

	@PostMapping(SELL)
	public void sellCard(@RequestBody StoreTransactionDto storeDto);

}
