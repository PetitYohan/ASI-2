package com.asi2.backendmarket.ESB;

import com.asi2.backendmarket.dto.card.CardDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CardMessage {

    private List<CardDto> cardDtoList;

    private String callbackUrl;
    public List<CardDto> getCardDtoList() {
        return cardDtoList;
    }

    public void setCardDtoList(List<CardDto> cardDtoList) {
        this.cardDtoList = cardDtoList;
    }

    public String getCallbackUrl() {
        return callbackUrl;
    }

    public void setCallbackUrl(String callbackUrl) {
        this.callbackUrl = callbackUrl;
    }
}
