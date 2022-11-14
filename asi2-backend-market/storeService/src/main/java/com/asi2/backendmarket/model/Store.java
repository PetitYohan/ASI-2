package com.asi2.backendmarket.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Store {
	@Id
	@GeneratedValue
	@Column
	private int idStore;
	@Column
	private int userIdStore;
	@Column
	private int cardInstanceIdStore;
	@Column
	private double priceStore;
	@Column(nullable = false, updatable = false)
	@CreationTimestamp
	private Date dateStore;

	
	public Store(int userIdStore, int cardInstanceIdStore, double priceStore) {
		this.userIdStore = userIdStore;
		this.cardInstanceIdStore = cardInstanceIdStore;
		this.priceStore = priceStore;
	}

	public Store() {
	}

	public int getIdStore() {
		return this.idStore;
	}

	public void setIdStore(int idStore) {
		this.idStore = idStore;
	}

	public int getUserIdStore() {
		return this.userIdStore;
	}

	public void setUserIdStore(int userIdStore) {
		this.userIdStore = userIdStore;
	}

	public int getCardInstanceIdStore() {
		return this.cardInstanceIdStore;
	}

	public void setCardInstanceIdStore(int cardInstanceIdStore) {
		this.cardInstanceIdStore = cardInstanceIdStore;
	}

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

	
}
