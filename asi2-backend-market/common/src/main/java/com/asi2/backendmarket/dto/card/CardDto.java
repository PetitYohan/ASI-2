package com.asi2.backendmarket.dto.card;

public class CardDto extends CardBasics {
	private Integer id;
	private float energy;
	private float hp;
	private float defence;
	private float attack;
	private float price;
	private Integer userId;

	public CardDto() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public float getEnergy() {
		return energy;
	}

	public void setEnergy(float energy) {
		this.energy = energy;
	}

	public float getHp() {
		return hp;
	}

	public void setHp(float hp) {
		this.hp = hp;
	}

	public float getDefence() {
		return defence;
	}

	public void setDefence(float defence) {
		this.defence = defence;
	}

	public float getAttack() {
		return attack;
	}

	public void setAttack(float attack) {
		this.attack = attack;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public float computePrice() {
		return this.hp * 20 + this.defence * 20 + this.energy * 20 + this.attack * 20;
	}

	@Override
	public String toString() {
		return "CardDto [id=" + id + ", energy=" + energy + ", hp=" + hp + ", defence=" + defence + ", attack=" + attack
				+ ", price=" + price + ", userId=" + userId + "]";
	}
	
}
