package com.asi2.backendmarket.ESB;

import com.asi2.backendmarket.dto.store.StoreAction;
import com.asi2.backendmarket.dto.store.StoreOrder;
import com.asi2.backendmarket.dto.user.UserDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StoreMessage {

    private StoreOrder order;

    private StoreAction action;
    private String callbackUrl;

    public StoreAction getAction() {
        return action;
    }

    public void setAction(StoreAction action) {
        this.action = action;
    }

    public StoreOrder getOrder() {
        return order;
    }

    public void setOrder(StoreOrder orderList) {
        this.order = orderList;
    }

    public String getCallbackUrl() {
        return callbackUrl;
    }

    public void setCallbackUrl(String callbackUrl) {
        this.callbackUrl = callbackUrl;
    }
}
