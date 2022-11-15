package com.asi2.backendmarket.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.repository.CardModelRepository;
import com.asi2.backendmarket.model.CardModel;
import com.asi2.backendmarket.model.CardReference;

@Service
public class CardModelService {

	@Autowired
	ModelMapper mapper;

	private final CardModelRepository cardRepository;
	private final CardReferenceService cardRefService;
	private Random rand;

	public CardModelService(CardModelRepository cardRepository, CardReferenceService cardRefService) {
		this.rand = new Random();
		// Dependencies injection by constructor
		this.cardRepository = cardRepository;
		this.cardRefService = cardRefService;
	}

	public List<CardDto> getAllCardModel() {
		List<CardModel> cardList = new ArrayList<>();
		cardRepository.findAll().forEach(cardList::add);
		return cardList
				.stream()
				.map(entry -> mapper.map(entry, CardDto.class))
				.collect(Collectors.toList());
	}

	public CardDto addCard(CardDto cardDto) {
		CardModel cDb = cardRepository.save(mapper.map(cardDto, CardModel.class));
		return mapper.map(cDb, CardDto.class);
	}

	public void updateCardRef(CardDto cardDto) {
		cardRepository.save(mapper.map(cardDto, CardModel.class));
	}

	public CardDto updateCard(Integer id, CardDto cardDto) {

		if (id != cardDto.getId()) {
			return null;
		} else if (!cardRepository.existsById(id)) {
			return null;
		} else {
			CardModel c = mapper.map(cardDto, CardModel.class);
			CardModel cBd = cardRepository.save(c);
			return mapper.map(cBd, CardDto.class);
		}
	}

	public CardDto getCard(Integer id) {
		Optional<CardModel> c_opt = cardRepository.findById(id);
		if (c_opt.isPresent()) {
			return mapper.map(c_opt.get(), CardDto.class);
		} else {
			return null;
		}
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

	public List<CardDto> getAllCardToSell() {
		return this.cardRepository.findByUserId(null)
				.stream()
				.map(entry -> mapper.map(entry, CardDto.class))
				.collect(Collectors.toList());
	}

	public List<CardDto> getUserCards(Integer id) {
		return this.cardRepository.findByUserId(id)
				.stream()
				.map(entry -> mapper.map(entry, CardDto.class))
				.collect(Collectors.toList());
	}
}
