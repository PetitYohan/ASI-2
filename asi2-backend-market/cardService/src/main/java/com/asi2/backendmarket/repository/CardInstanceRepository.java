package com.asi2.backendmarket.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.asi2.backendmarket.model.CardInstance;

public interface CardInstanceRepository extends CrudRepository<CardInstance, Integer>{
	
	Optional<List<CardInstance>> findByIdUser(int idUser);

}
