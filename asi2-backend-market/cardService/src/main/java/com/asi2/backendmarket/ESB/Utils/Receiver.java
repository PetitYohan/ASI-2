package com.asi2.backendmarket.ESB.Utils;

import com.asi2.backendmarket.ESB.CardMessage;
import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class Receiver {

    @Autowired
    public CardService cardService;


    @JmsListener(destination = "${spring-messaging.queue.name}")
    public void receiveMessage(CardMessage message) {
        log.info(message);
            for(CardDto card : message.getCardDtoList()) {
                // cardService.updateCard(card);

            }

    }
}
