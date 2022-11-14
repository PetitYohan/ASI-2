package com.asi2.backendmarket.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.asi2.backendmarket.model.CardModel;

public interface CardModelRepository extends CrudRepository<CardModel, Integer> {
    List<CardModel> findByUser(UserModel u);
}
