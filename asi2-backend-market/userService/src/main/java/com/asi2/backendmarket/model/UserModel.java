package com.asi2.backendmarket.model;

import javax.persistence.*;

import com.asi2.backendmarket.dto.user.UserDto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.mindrot.jbcrypt.BCrypt;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class UserModel implements Serializable {

		private static final long serialVersionUID = 2733795832476568049L;
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Integer id;
		private String login;
		private String pwd;
		private float account;
		private String lastName;
		private String surName;
		private String email;

	public UserModel(Integer id,  String lastName, String surName, String email, float account, String pwd) {
		this.id =id;
		this.pwd = pwd;
		this.account = account;
		this.lastName = lastName;
		this.surName = surName;
		this.email = email;
	}

	public UserModel() {
			this.login = "";
			this.pwd = "";
			this.lastName="lastname_default";
			this.surName="surname_default";
			this.email="email_default";
		}

	public UserModel(String login, String pwd) {
			super();
			this.login = login;
			this.pwd = pwd;
			this.lastName="lastname_default";
			this.surName="surname_default";
			this.email="email_default";
		}

	public UserModel(UserDto user) {
			this.id=user.getIdUser();
			this.login=user.getLogin();
			this.pwd=user.getPwd();
			this.account=user.getAccount();
			this.lastName=user.getLastName();
			this.surName=user.getSurName();
			this.email=user.getEmail();
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getLogin() {
			return login;
		}

		public void setLogin(String login) {
			this.login = login;
		}

		public String getPwd() {
			return pwd;
		}

		public void setPwd(String pwd) {
			this.pwd = pwd;
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

		public String getSurName() {
			return surName;
		}

		public void setSurName(String surName) {
			this.surName = surName;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

	}