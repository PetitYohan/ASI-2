package com.asi2.backendmarket.rest.card;

import java.util.List;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.rest.IRest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

public interface ICardRest extends IRest {
	
	public final String ROOT_PATH = "/api/card";
	public final String GET_ID = ROOT_PATH + "/{id}";
	public final String UPDATE_CARD = ROOT_PATH + "/{id}";
	public final String DELETE_CARD = ROOT_PATH + "/{id}";
	public final String ADD_CARD = ROOT_PATH + "/";
	public final String GET_ALL = ROOT_PATH + "/cards";
	public final String GET_CARDS_TO_SELL = ROOT_PATH + "/cards_to_sell";
	public final String GET_USER_CARDS = ROOT_PATH + "/user/{id}";

	@GetMapping(GET_ID)
	public ResponseEntity<CardDto> getCard(@PathVariable Integer id);

	@PutMapping(UPDATE_CARD)
	public ResponseEntity<CardDto> updateCard(@PathVariable Integer id, @RequestBody CardDto cardDto);

	@DeleteMapping(DELETE_CARD)
	public void deleteCard(@PathVariable Integer id);

	@PostMapping(ADD_CARD)
	public ResponseEntity<CardDto> addCard(@RequestBody CardDto cardDto);

	@GetMapping(GET_ALL)
	public List<CardDto> getAllCards();

	@GetMapping(GET_CARDS_TO_SELL)
	public List<CardDto> getCardsToSell();

	@GetMapping(GET_USER_CARDS)
	public List<CardDto> getUserCards(@PathVariable Integer id);

}
