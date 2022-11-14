package com.asi2.backendmarket.rest.card;

import java.util.List;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.rest.IRest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

public interface ICardRest extends IRest {
	public final String ROOT_PATH = "/api";
	public final String CARD_PATH = ROOT_PATH + "/card";

	public final String GET_ID = CARD_PATH + "/{id}";
	public final String UPDATE_CARD = CARD_PATH + "/{id}";
	public final String DELETE_CARD = CARD_PATH + "/{id}";
	public final String ADD_CARD = ROOT_PATH;
	public final String GET_ALL = ROOT_PATH + "/cards";
	public final String GET_CARDS_TO_SELL = ROOT_PATH + "/cards_to_sell";

	@GetMapping(GET_ID)
	public CardDto getCard(@PathVariable int id);

	@PutMapping(UPDATE_CARD)
	public CardDto update(@PathVariable int id);

	@DeleteMapping(DELETE_CARD)
	public boolean delete_card(@PathVariable int id);

	@PostMapping(ADD_CARD)
	public CardDto add(CardDto cardDto);

	@GetMapping(GET_ALL)
	public List<CardDto> getAllCards();

	@GetMapping(GET_CARDS_TO_SELL)
	public List<CardDto> getCardsToSell();

}
