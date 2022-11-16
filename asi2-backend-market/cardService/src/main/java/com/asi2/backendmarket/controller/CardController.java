package com.asi2.backendmarket.controller;

import java.util.List;
import com.asi2.backendmarket.dto.card.CardDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.asi2.backendmarket.rest.card.ICardRest;
import com.asi2.backendmarket.service.CardModelService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin
@RestController
public class CardController implements ICardRest {

	private final static Logger LOG = LoggerFactory.getLogger(CardController.class);

	@Autowired
	CardModelService cardModelService;

	@Override
	public List<CardDto> getAllCards() {
		return cardModelService.getAllCardModel();
	}

	@Override
	public ResponseEntity<CardDto> getCard(Integer id) {
		CardDto c = cardModelService.getCard(id);
		if (c != null) {
			return new ResponseEntity<CardDto>(c, HttpStatus.OK);
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card id:" + id + ", not found", null);
		}

	}

	@Override
	public ResponseEntity<CardDto> addCard(CardDto card) {
		CardDto c = cardModelService.addCard(card);
		if (c != null) {
			return new ResponseEntity<CardDto>(card, HttpStatus.OK);
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Card:" + card + ", could not be inserted", null);
		}
	}

	@Override
	public ResponseEntity<CardDto> updateCard(Integer id, CardDto card) {
		CardDto updatedCard = cardModelService.updateCard(id, card);
		if (updatedCard != null) {
			return new ResponseEntity<CardDto>(updatedCard, HttpStatus.OK);
		} else {
			// TODO catch exception before to modify msg
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Card:" + card + ", could not be updated",
					null);
		}

	}

	@Override
	public void deleteCard(Integer id) {
		cardModelService.deleteCardModel(id);

	}

	@Override
	public List<CardDto> getCardsToSell() {
		return cardModelService.getAllCardToSell();
	}

	@Override
	public List<CardDto> getUserCards(Integer id) {
		return cardModelService.getUserCards(id);

	}

}
