package com.asi2.backendmarket.service;

import org.assertj.core.api.Assert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Optional;

import com.asi2.backendmarket.dto.user.BalanceUserDto;
import com.asi2.backendmarket.model.StoreTransaction;
import com.asi2.backendmarket.repository.StoreRepository;
import com.asi2.backendmarket.rest.card.CardRestConsumer;
import com.asi2.backendmarket.rest.user.UserRestConsumer;


@ExtendWith(MockitoExtension.class)
class StoreServiceTest {

    @InjectMocks
    @Spy
    StoreService storeService;

    @Mock
    StoreRepository storeRepositoryMock;

    @Mock
    CardRestConsumer cardRestConsumerMock;

    @Mock
    UserRestConsumer userRestConsumerMock;


    // =========== Test Buy ===========

    @Test
    void testBuyOk() {
        Optional<StoreTransaction> oStore = Optional.of(new StoreTransaction(1, 1, 10));

        when(storeRepositoryMock.findById(anyInt())).thenReturn(oStore);
        
        //when(userRestConsumerMock.balanceUserMoney(any(BalanceUserDto.class))).thenReturn(new ResponseEntity<Boolean>(true, HttpStatus.OK));
        //when(userRestConsumerMock.balanceUserMoney(any(BalanceUserDto.class))).thenReturn(new ResponseEntity<Boolean>(true, HttpStatus.OK));
        
        //when(cardRestConsumerMock.buyCard(anyInt(), anyInt())).thenReturn(new ResponseEntity<Boolean>(true, HttpStatus.OK));

        Assertions.assertThat(storeService.buy(1, 1) == true);
    }

    @Test
    void testBuyBuyDidNotHappened() {
        Optional<StoreTransaction> oStore = Optional.of(new StoreTransaction(1, 1, 10));

        when(storeRepositoryMock.findById(anyInt())).thenReturn(oStore);
        
        //doReturn(ResponseEntity.ok(false)).when(userRestConsumerMock).balanceUserMoney(any(BalanceUserDto.class));
        //when(userRestConsumerMock.balanceUserMoney(new BalanceUserDto())).thenReturn(new ResponseEntity<Boolean>(false, HttpStatus.OK));
        //when(userRestConsumerMock.balanceUserMoney(new BalanceUserDto())).thenReturn(new ResponseEntity<Boolean>(false, HttpStatus.OK));
        
        //when(cardRestConsumerMock.buyCard(anyInt(), anyInt())).thenReturn(new ResponseEntity<Boolean>(false, HttpStatus.OK));

        System.out.println(storeService.buy(1, 1));

        Assertions.assertThat(storeService.buy(1, 1)).isFalse();
    }
}
