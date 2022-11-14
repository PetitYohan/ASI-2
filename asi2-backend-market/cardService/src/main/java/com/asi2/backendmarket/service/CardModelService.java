package com.asi2.backendmarket.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.dto.card.CardDto;

@Service
public class CardModelService {
	private final CardModelRepository cardRepository;
	private final CardReferenceService cardRefService;
	private Random rand;

	public CardModelService(CardModelRepository cardRepository, CardReferenceService cardRefService) {
		this.rand = new Random();
		// Dependencies injection by constructor
		this.cardRepository = cardRepository;
		this.cardRefService = cardRefService;
	}

	public List<CardModel> getAllCardModel() {
		List<CardModel> cardList = new ArrayList<>();
		cardRepository.findAll().forEach(cardList::add);
		return cardList;
	}

	public CardDto addCard(CardModel cardModel) {
		CardModel cDb = cardRepository.save(cardModel);
		return DTOMapper.fromCardModelToCardDTO(cDb);
	}

	public void updateCardRef(CardModel cardModel) {
		cardRepository.save(cardModel);

	}

	public CardDto updateCard(CardModel cardModel) {
		CardModel cDb = cardRepository.save(cardModel);
		return DTOMapper.fromCardModelToCardDTO(cDb);
	}

	public Optional<CardModel> getCard(Integer id) {
		return cardRepository.findById(id);
	}

	public void deleteCardModel(Integer id) {
		cardRepository.deleteById(id);
	}

	public List<CardModel> getRandCard(int nbr) {
		List<CardModel> cardList = new ArrayList<>();
		for (int i = 0; i < nbr; i++) {
			CardReference currentCardRef = cardRefService.getRandCardRef();
			CardModel currentCard = new CardModel(currentCardRef);
			currentCard.setAttack(rand.nextFloat() * 100);
			currentCard.setDefence(rand.nextFloat() * 100);
			currentCard.setEnergy(100);
			currentCard.setHp(rand.nextFloat() * 100);
			currentCard.setPrice(currentCard.computePrice());
			// save new card before sending for user creation
			// this.addCard(currentCard);
			cardList.add(currentCard);
		}
		return cardList;
	}

	public List<CardModel> getAllCardToSell() {
		return this.cardRepository.findByUser(null);
	}
}
