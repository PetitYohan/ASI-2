package com.asi2.backendmarket.dto.user;

public class UserDto {
	private Integer idUser;
	private String login;
	private float account;
	private String pwd;
	private String lastName;
	private String surName;
	private String email;
	private String token;

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public float getAccount() {
		return account;
	}

	public void setAccount(float account) {
		this.account = account;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surname) {
		this.surName = surname;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "UserDto [idUser=" + idUser + ", login=" + login + ", account=" + account + ", pwd=" + pwd
				+ ", lastName=" + lastName + ", surName=" + surName + ", email=" + email + ", token=" + token + "]";
	}
	
}
