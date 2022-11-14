package com.asi2.backendmarket.rest.store;

import java.util.List;

import com.asi2.backendmarket.dto.store.StoreOrder;
import com.asi2.backendmarket.dto.store.StoreTransactionDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.asi2.backendmarket.rest.IRest;

public interface IStoreRest extends IRest {
	public final String ROOT_PATH = "/api/store";

	public final String GET = ROOT_PATH + "/{id}";

	public final String BUY = ROOT_PATH + "/buy";
	public final String SELL = ROOT_PATH + "/sell";
	public final String TRANSACTION = ROOT_PATH + "/transaction";

	@PostMapping(BUY)
	public Boolean buyCard(@RequestBody StoreOrder orderDto);

	@PostMapping(SELL)
	public Boolean sellCard(@RequestBody StoreOrder orderDto);

	@GetMapping(TRANSACTION)
	public List<StoreTransactionDto> getAllCards();

}
