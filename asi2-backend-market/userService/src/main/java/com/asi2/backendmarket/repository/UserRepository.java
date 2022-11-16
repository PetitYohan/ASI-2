package com.asi2.backendmarket.repository;

import com.asi2.backendmarket.model.UserModel;
import org.springframework.data.repository.CrudRepository;


import java.util.Optional;

public interface UserRepository extends CrudRepository<UserModel, Integer>{
	
	public Optional<UserModel> findByEmail(String email);
	public Optional<UserModel> findByLogin(String login);

	
}