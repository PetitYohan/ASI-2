package com.asi2.backendmarket.repository;

import org.springframework.data.repository.CrudRepository;

import com.asi2.backendmarket.model.StoreTransaction;

public interface StoreRepository extends CrudRepository<StoreTransaction, Integer> {

}
