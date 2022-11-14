package com.asi2.backendmarket.controller;

import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.model.CardModel;

public class CardDTOMapper {
    public static CardDto fromCardModelToCardDTO(CardModel cM) {
        CardDto cDto = new CardDto();
        cDto.setEnergy(cM.getEnergy());
        cDto.setHp(cM.getHp());
        cDto.setDefence(cM.getDefence());
        cDto.setAttack(cM.getAttack());
        cDto.setPrice(cM.getPrice());
        cDto.setId(cM.getId());
        return cDto;
    }

    public static CardModel fromCardDtoToCardModel(CardDto cD) {
        CardModel cm = new CardModel(cD);
        cm.setEnergy(cD.getEnergy());
        cm.setHp(cD.getHp());
        cm.setDefence(cD.getDefence());
        cm.setAttack(cD.getAttack());
        cm.setPrice(cD.getPrice());
        cm.setId(cD.getId());
        return cm;
    }
}
