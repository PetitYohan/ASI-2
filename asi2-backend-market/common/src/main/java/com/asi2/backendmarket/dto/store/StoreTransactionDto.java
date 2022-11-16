package com.asi2.backendmarket.dto.store;

public class StoreTransactionDto {
	
	private double priceStore;
	private int idStore;
	//TODO rename en cardInstanceId
	private int idCard;
	//TODO delete ou rename en userId
	private int idUser;
	private StoreAction action;

	public StoreAction getAction() {
		return action;
	}
	public void setAction(StoreAction action) {
		this.action = action;
	}

	public double getPriceStore() {
		return priceStore;
	}
	public void setPriceStore(double price) {
		this.priceStore = price;
	}
	public int getIdStore() {
		return idStore;
	}
	public void setIdStore(int idStore) {
		this.idStore = idStore;
	}
	public int getIdCard() {
		return idCard;
	}
	public void setIdCard(int idCard) {
		this.idCard = idCard;
	}
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	
	@Override
	public String toString() {
		return "StoreTransactionDto [priceStore=" + priceStore + ", idStore=" + idStore + ", idCard=" + idCard
				+ ", idUser=" + idUser + "]";
	}
	
}
