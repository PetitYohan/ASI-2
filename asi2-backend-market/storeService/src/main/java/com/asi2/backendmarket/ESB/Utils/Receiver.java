package com.asi2.backendmarket.ESB.Utils;

import com.asi2.backendmarket.ESB.StoreMessage;
import com.asi2.backendmarket.dto.store.StoreAction;
import com.asi2.backendmarket.dto.store.StoreOrder;
import com.asi2.backendmarket.service.StoreService;
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
    public StoreService storeService;

    @JmsListener(destination = "${spring-messaging.queue.name}")
    public void receiveMessage(StoreMessage message) {
        log.info(message);
        if (message.getAction().equals(StoreAction.BUY)) {
            storeService.buyCard(message.getOrder().getUserId(), message.getOrder().getCardId());

        } else if (message.getAction().equals(StoreAction.SELL)) {
            storeService.sellCard(message.getOrder().getUserId(), message.getOrder().getCardId());

        }

    }
}
