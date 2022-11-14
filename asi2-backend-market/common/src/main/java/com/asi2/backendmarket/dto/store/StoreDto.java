package com.asi2.backendmarket.dto.store;

import java.sql.Date;
import com.asi2.backendmarket.dto.card.CardInstanceDto;

public class StoreDto {
    
    private double priceStore;
    private Date dateStore;
	private int idStore;
    private CardInstanceDto cardInstance;

    public double getPriceStore() {
        return this.priceStore;
    }

    public void setPriceStore(double priceStore) {
        this.priceStore = priceStore;
    }

    public Date getDateStore() {
        return this.dateStore;
    }

    public void setDateStore(Date dateStore) {
        this.dateStore = dateStore;
    }

    public int getIdStore() {
        return this.idStore;
    }

    public void setIdStore(int idStore) {
        this.idStore = idStore;
    }

    public CardInstanceDto getCardInstance() {
        return this.cardInstance;
    }

    public void setCardInstance(CardInstanceDto cardInstance) {
        this.cardInstance = cardInstance;
    }

}
