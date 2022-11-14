package com.asi2.backendmarket.init;

import java.lang.reflect.Array;
import java.util.Arrays;

import com.asi2.backendmarket.model.Store;
import com.asi2.backendmarket.repository.StoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBOperationRunner implements CommandLineRunner {
    @Autowired
    StoreRepository storeRepository;
    @Override
    public void run(String... args) throws Exception {
        // System.out.println("---------------------- Begin saving ----------------------");

        // Store store = new Store(0, 6, 50.0);

        // storeRepository.saveAll(Arrays.asList(store));
        
        // System.out.println("---------------------- All Data saved into Database ----------------------");
    }

}