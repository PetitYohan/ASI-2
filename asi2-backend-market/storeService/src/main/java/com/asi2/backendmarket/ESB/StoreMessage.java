package com.asi2.backendmarket.ESB;

import com.asi2.backendmarket.dto.store.StoreTransactionDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.model.StoreAction;
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

    private List<StoreTransactionDto> transactionDtoList;

    private String callbackUrl;
    private StoreAction action;

    public StoreAction getAction() {
        return action;
    }

    public void setAction(StoreAction action) {
        this.action = action;
    }

    public List<StoreTransactionDto> getTransactionDtoList() {
        return transactionDtoList;
    }

    public void setTransactionDtoList(List<StoreTransactionDto> transactionDtoList) {
        this.transactionDtoList = transactionDtoList;
    }

    public String getCallbackUrl() {
        return callbackUrl;
    }

    public void setCallbackUrl(String callbackUrl) {
        this.callbackUrl = callbackUrl;
    }
}
