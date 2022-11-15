package com.asi2.backendmarket.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.asi2.backendmarket.dto.card.CardBasics;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class CardModel extends CardBasics {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column
	private float energy;
	@Column
	private float hp;
	@Column
	private float defence;
	@Column
	private float attack;
	@Column
	private float price;
	@ManyToOne
	@Column
	private CardReference reference;
	@Column
	private Integer userId;
	@Column
	private Integer storeId;

	public CardModel() {
		super();
	}

	public CardModel(CardModel cModel) {
		super(cModel);
		this.energy = cModel.getEnergy();
		this.hp = cModel.getHp();
		this.defence = cModel.getDefence();
		this.attack = cModel.getAttack();
		this.price = cModel.getPrice();
	}

	public CardModel(CardBasics cardBasic) {
		super(cardBasic);
	}

	public CardModel(String name, String description, String family, String affinity, float energy, float hp,
			float defence, float attack, String imgUrl, String smallImg, float price) {
		super(name, description, family, affinity, imgUrl, smallImg);
		this.energy = energy;
		this.hp = hp;
		this.defence = defence;
		this.attack = attack;
		// this.price=price;
		this.price = this.computePrice();
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

	public void setStoreId(Integer storeModelId) {
		this.storeId = storeModelId;
	}

	public Integer getStoreId() {
		return storeId;
	}

	public float computePrice() {
		return this.hp * 20 + this.defence * 20 + this.energy * 20 + this.attack * 20;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public CardReference getreference() {
		return reference;
	}

	public void setreference(CardReference reference) {
		this.reference = reference;
	}

}
