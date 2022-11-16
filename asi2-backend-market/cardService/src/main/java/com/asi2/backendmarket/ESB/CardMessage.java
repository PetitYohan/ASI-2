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

    private CardDto cardDto;

    private Integer cardId;

    private String callbackUrl;

    public CardDto getCardDto() {
        return cardDto;
    }

    public void setCardDto(CardDto cardDto) {
        this.cardDto = cardDto;
    }

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

    public String getCallbackUrl() {
        return callbackUrl;
    }

    public void setCallbackUrl(String callbackUrl) {
        this.callbackUrl = callbackUrl;
    }
}
