package com.asi2.backendmarket.rest.card;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.asi2.backendmarket.dto.card.CardDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

public class CardRestConsumer implements ICardRest {

    private final static Logger LOG = LoggerFactory.getLogger(CardRestConsumer.class);

    private RestTemplate restTemplate = new RestTemplate();

    @Override
    public CardDto getCard(int id) {
        return (CardDto) restTemplate.getForObject(GET_ID, CardDto.class, id);
    }

    @Override
    public CardDto update(int id) {

        return null;
    }

    // TODO: update return value
    @Override
    public boolean delete_card(int id) {
        restTemplate.delete(DELETE_CARD, id);
        return true;
    }

    @Override
    public CardDto add(CardDto cardDto) {
        restTemplate.postForEntity(ADD_CARD, cardDto, CardDto.class);
        return cardDto;
    }

    @Override
    public List<CardDto> getAllCards() {
        return (List<CardDto>) restTemplate.getForEntity(GET_ALL, CardDto[].class);
    }

    @Override
    public List<CardDto> getCardsToSell() {
        return (List<CardDto>) restTemplate.getForEntity(GET_CARDS_TO_SELL, CardDto[].class);
    }

}
