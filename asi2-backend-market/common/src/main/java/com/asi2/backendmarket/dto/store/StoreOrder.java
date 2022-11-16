package com.asi2.backendmarket.dto.store;

public class StoreOrder {
	private Integer userId;
	private Integer cardId;

	public StoreOrder() {
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCardId() {
		return cardId;
	}

	public void setCardId(Integer cardId) {
		this.cardId = cardId;
	}

	@Override
	public String toString() {
		return "StoreOrder [userId=" + userId + ", cardId=" + cardId + "]";
	}	

}
