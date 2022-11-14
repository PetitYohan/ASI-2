package com.asi2.backendmarket.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asi2.backendmarket.model.Store;
import com.asi2.backendmarket.repository.StoreRepository;

import com.asi2.backendmarket.dto.card.CardInstanceDto;
import com.asi2.backendmarket.dto.user.BalanceUserDto;
import com.asi2.backendmarket.dto.user.UserDto;
import com.asi2.backendmarket.rest.card.CardRestConsumer;
import com.asi2.backendmarket.rest.user.UserRestConsumer;

@Service
public class StoreService {
	
	@Autowired
	StoreRepository storeRepository;

	private static final CardRestConsumer cardRestConsumer = new CardRestConsumer();
	private static final UserRestConsumer userRestConsumer = new UserRestConsumer();
	
	private Map<Store, CardInstanceDto> zipStoreCardDto(List<Store> stores, List<CardInstanceDto> cards) {
		// On sort avant pour pouvoir matcher l'ordre d'index de la liste et l'ordre des id de cartes
		stores.sort(Comparator.comparing(Store::getCardInstanceIdStore));
		cards.sort(Comparator.comparing(CardInstanceDto::getIdInstance));
		Map<Store, CardInstanceDto> storeCardPairList = new HashMap<>();
		for(int i = 0; i < cards.size(); i++) {
			storeCardPairList.put(stores.get(i), cards.get(i));
		}
		return storeCardPairList;
	}
	
	public Map<Store, CardInstanceDto> getAllStores() {
		List<Store> storeList = (List<Store>) storeRepository.findAll();
		Integer[] cardInstanceIdList = storeList
			.stream()
			.mapToInt(Store::getCardInstanceIdStore)
			.boxed()
			.toArray( Integer[]::new );
		List<CardInstanceDto> cardInstanceDtoList = cardRestConsumer.getCardInstanceList(cardInstanceIdList).getBody();
		Map<Store, CardInstanceDto> zippedStoreCardDto = zipStoreCardDto(storeList, cardInstanceDtoList);
		return zippedStoreCardDto;
    }
	
	private void deduct(int userId, double amount){
        //user.setMoneyUser(user.getMoneyUser() - amount);
        //userRepository.save(user);
    }

    private void deposit(int userId, double amount){
    	//user.setMoneyUser(user.getMoneyUser() + amount);
        //userRepository.save(user);
    }	
	
    //TODO catch en dehors pour msg d'erreur ?
	private void buyTransaction(int buyerId, Store store) {
		int sellerId = store.getUserIdStore();
		double price = store.getPriceStore();
		//money transfer
	    deduct(buyerId, price);
	    deposit(sellerId, price);
	    //update card
	    int card = store.getCardInstanceIdStore();
	    //card.setUserInstance(buyerId);
	    //cardInstanceRepository.save(card);
	    //delete store
	    storeRepository.delete(store);	    	
	}
	
	private void createOfferTransaction(int sellerId, int cardId, double price) {
		//Store store = new Store(sellerId, cardId, price);		
		//storeRepository.save(store);
		//cardId.setUserInstance(null);
		//cardInstanceRepository.save(cardId);
	}
	
	public boolean buy(int idStore, int idUser) {
		
		Optional<Store> storeOpt = storeRepository.findById(idStore);
		if(!storeOpt.isPresent()) {
			return false;
		}
		Store store = storeOpt.get();

		BalanceUserDto buyer = new BalanceUserDto();
		buyer.setBalanceMoney(-store.getPriceStore());
		buyer.setIdUser(idUser);

		BalanceUserDto seller = new BalanceUserDto();
		seller.setBalanceMoney(store.getPriceStore());
		seller.setIdUser(store.getUserIdStore());

		try {
			System.out.println("Service_______________________________\n");
			System.out.println(buyer.getIdUser() + buyer.getBalanceMoney() + buyer.toString());
			System.out.println("Service_______________________________\n");

			Boolean buyHappened = userRestConsumer.balanceUserMoney(buyer).getBody();
			Boolean sellHappened = userRestConsumer.balanceUserMoney(seller).getBody();
			
			Boolean res = cardRestConsumer.buyCard(Integer.valueOf(store.getCardInstanceIdStore()), Integer.valueOf(buyer.getIdUser())).getBody();
			storeRepository.delete(store);
			return buyHappened && sellHappened && res;
		} catch (Exception e) {
			System.out.println("_______________________________\n");
			e.printStackTrace();
			System.out.println("_______________________________\n");
			return false;
		}
		
	}
	
	//TODO remove test sur User et use getCurrentUser() + utiliser des exceptions
	public boolean sell(int idUser, int idCardInstance, double price) {
		Boolean res = cardRestConsumer.sellCard(Integer.valueOf(idCardInstance)).getBody();
		Store s = new Store();
		s.setCardInstanceIdStore(idCardInstance);
		s.setUserIdStore(idUser);
		s.setPriceStore(price);
		storeRepository.save(s);
		return res;
			
	}
}
