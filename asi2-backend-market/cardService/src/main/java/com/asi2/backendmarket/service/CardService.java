package com.asi2.backendmarket.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.model.CardReference;
import com.asi2.backendmarket.repository.CardRefRepository;
import com.asi2.backendmarket.repository.CardRepository;

@Service
public class CardService {
	private final static Logger LOG = LoggerFactory.getLogger(CardService.class);

	@Autowired
	CardRepository cardRepository;

	@Autowired
	CardRefRepository CardRefRepository;

	private int numberOfCardThoGenerate = 5;

	public CardDto getCard(int idCard) {
		LOG.info("[getCard] idCard: " + idCard);

		Optional<CardDto> c = cardRepository.findById(idCard);
		if (c.isPresent())
			return c.get();
		throw new RuntimeException("Ressource not found");
	}

	public List<CardReference> getCardsByUser(int idUser) {
		Optional<List<CardReference>> oCards = CardRefRepository.findByIdUser(idUser);
		if (oCards.isPresent())
			return oCards.get();
		return new ArrayList<CardReference>();
	}

	public List<CardDto> getAll() {
		List<CardDto> cards = (ArrayList<CardDto>) cardRepository.findAll();
		return cards;
	}

	public List<CardReference> getAllInstanceByIds(Integer[] ids) {
		List<CardReference> cards = new ArrayList<CardReference>();
		CardRefRepository.findAllById(Arrays.asList(ids)).forEach(cards::add);

		return cards;
	}

	private List<CardDto> getRandomCards(int nbToGenerate) {
		List<CardDto> allCards = this.getAll();
		List<CardDto> cards = new ArrayList<CardDto>();
		Random r = new Random();

		for (int i = 0; i < nbToGenerate; i++) {
			cards.add(allCards.get(r.nextInt(allCards.size())));
		}

		if (cards.size() < nbToGenerate)
			throw new RuntimeException("Pas assez de cartes générées aléatoirement");

		return cards;
	}

	public List<CardReference> registerNewUserCards(int idUser) {
		List<CardDto> cards = this.getRandomCards(this.numberOfCardThoGenerate);
		List<CardReference> cardsInstances = new ArrayList<CardReference>();
		for (CardDto card : cards) {
			CardReference ci = convertCardToCardInstance(card);
			ci.setIdUser(idUser);
			cardsInstances.add(CardRefRepository.save(ci));
		}
		return cardsInstances;
	}

	public Boolean buyCard(Integer idCardInstance, Integer idUser) {
		try {
			CardReference card = CardRefRepository.findById(idCardInstance).get();
			card.setIdUser(idUser);
			CardRefRepository.save(card);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public Boolean sellCard(Integer idCardInstance) {
		try {
			CardReference card = CardRefRepository.findById(idCardInstance).get();
			card.setIdUser(-1);
			CardRefRepository.save(card);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private CardReference convertCardToCardInstance(CardDto card) {
		CardReference ci = new CardReference(
				card,
				card.getEnergyCard(),
				card.getHpCard(),
				card.getAttackCard(),
				card.getDefenceCard());
		return ci;
	}

}
