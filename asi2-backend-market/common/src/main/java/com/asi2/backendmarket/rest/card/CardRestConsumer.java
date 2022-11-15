package com.asi2.backendmarket.rest.card;

import java.util.Arrays;
import java.util.List;

import com.asi2.backendmarket.dto.card.CardDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

public class CardRestConsumer implements ICardRest {

    private final static Logger LOG = LoggerFactory.getLogger(CardRestConsumer.class);

    private RestTemplate restTemplate = new RestTemplate();

    @Override
    public ResponseEntity<CardDto> getCard(Integer id) {
        return restTemplate.getForEntity(BASE_PATH + GET_ID, CardDto.class, id);
    }

    @Override
    public ResponseEntity<CardDto> updateCard(Integer id, CardDto cardDto) {
        HttpEntity<CardDto> request = new HttpEntity<>(cardDto);
        System.out.println("[CARD REST CONS] " + cardDto);
        return restTemplate.exchange(BASE_PATH + UPDATE_CARD, HttpMethod.PUT, request, CardDto.class, id);
    }

    // TODO: update others
    @Override
    public void deleteCard(Integer id) {
        restTemplate.delete(BASE_PATH + DELETE_CARD, id);
    }

    @Override
    public ResponseEntity<CardDto> addCard(CardDto cardDto) {
        return restTemplate.postForEntity(BASE_PATH + ADD_CARD, cardDto, CardDto.class);
    }

    @Override
    public List<CardDto> getAllCards() {
        return Arrays.asList(restTemplate.getForEntity(BASE_PATH + GET_ALL, CardDto[].class).getBody());
    }

    @Override
    public List<CardDto> getCardsToSell() {
        return Arrays.asList(restTemplate.getForEntity(BASE_PATH + GET_CARDS_TO_SELL, CardDto[].class).getBody());
    }

    @Override
    public List<CardDto> getUserCards(Integer id) {
        return Arrays.asList(restTemplate.getForEntity(BASE_PATH + GET_USER_CARDS, CardDto[].class).getBody());
    }

}
