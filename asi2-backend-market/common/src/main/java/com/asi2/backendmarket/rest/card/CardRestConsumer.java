package com.asi2.backendmarket.rest.card;

import java.util.Arrays;
import java.util.List;

import com.asi2.backendmarket.dto.card.CardDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class CardRestConsumer implements ICardRest {

    private final static Logger LOG = LoggerFactory.getLogger(CardRestConsumer.class);

    private RestTemplate restTemplate = new RestTemplate();

    @Override
    public ResponseEntity<CardDto> getCard(Integer id) {
        return restTemplate.getForEntity(GET_ID, CardDto.class, id);
    }

    @Override
    public ResponseEntity<CardDto> updateCard(Integer id, CardDto cardDto) {
        HttpEntity<CardDto> request = new HttpEntity<>(cardDto);
        return restTemplate.postForEntity(UPDATE_CARD, request, CardDto.class, id);

    }

    // TODO: update others
    @Override
    public void deleteCard(Integer id) {
        restTemplate.delete(DELETE_CARD, id);
    }

    @Override
    public ResponseEntity<CardDto> addCard(CardDto cardDto) {
        return restTemplate.postForEntity(ADD_CARD, cardDto, CardDto.class);
    }

    @Override
    public List<CardDto> getAllCards() {
        return Arrays.asList(restTemplate.getForEntity(GET_ALL, CardDto[].class).getBody());
    }

    @Override
    public List<CardDto> getCardsToSell() {
        return Arrays.asList(restTemplate.getForEntity(GET_CARDS_TO_SELL, CardDto[].class).getBody());
    }

    @Override
    public List<CardDto> getUserCards(Integer id) {
        return Arrays.asList(restTemplate.getForEntity(GET_USER_CARDS, CardDto[].class).getBody());
    }

}
