package com.asi2.backendmarket;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import com.asi2.backendmarket.model.CardModel;
import com.asi2.backendmarket.model.CardReference;
import com.asi2.backendmarket.repository.CardRefRepository;
import com.asi2.backendmarket.repository.CardModelRepository;
import com.asi2.backendmarket.service.CardModelService;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {
    
    @InjectMocks
    @Spy
    CardModelService cardService;

    @Mock
    CardRefRepository cardRefRepositoryMock;

    @Mock
    CardModelRepository cardModelRepositoryMock;

    private List<CardModel> listCardsInstance = Arrays.asList(new CardModel[]{new CardModel(),new CardModel(),new CardModel(), new CardModel(), new CardModel()});

    private ArrayList<CardReference> listCards = new ArrayList<>(Arrays.asList(new CardReference(),new CardReference(),new CardReference(), new CardReference(), new CardReference()));

    private List<CardModel> listNoCardsInstance = Arrays.asList(new CardModel[]{});
    /*
    // =========== getOneCard ===========
    @Test
    void testGetOneCard_validId() {
        CardReference card = new CardReference("Superman", "Desc : test de superman", "Feu", "affinity", "/url", "/smallurl");
        //CardModel cardInstance = new CardModel(card, 10, 10, 10, 10);
        Optional<CardReference> oCard = Optional.of(card);
        //when(cardInstanceRepositoryMock.save(any(CardModel.class))).thenReturn(cardInstance);

        when(cardRefRepositoryMock.findById(1)).thenReturn(oCard);

        Assertions.assertThat(cardService.getCard(1) != null);
    }

    @Test
    void testGetOneCardInValidIdThrowException() {

        Exception exception = assertThrows(RuntimeException.class, () -> {
            cardService.getCard(1);
        });

        assertTrue(exception.getMessage().contains("Ressource not found"));
    }

    // =========== getCardByUser ===========

     @Test
    void testGetCardsByUserValidUser() {
        Optional<List<CardModel>> oList = Optional.of(listCardsInstance);
        when(cardModelRepositoryMock.findByIdUser(1)).thenReturn(oList);

        Assertions.assertThat(!cardService.getCardsByUser(1).isEmpty());
    }
    
    @Test
    void testGetCardsByUserNonExistantUser() {
        Optional<List<CardModel>> oList = Optional.of(listNoCardsInstance);

        when(cardModelRepositoryMock.findByIdUser(1)).thenReturn(oList);

        Assertions.assertThat(cardService.getCardsByUser(1).isEmpty());
    }

    @Test
    void testRegisterNewUserOk() {
        when(cardService.getAll()).thenReturn(listCards);
    
        when(cardModelRepositoryMock.save(any(CardModel.class))).thenReturn(new CardModel());

        Assertions.assertThat(!cardService.registerNewUserCards(1).isEmpty());
    }

    @Test
    void testRegisterNewUserNotEnoughCards() {
        when(cardService.getAll()).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            cardService.registerNewUserCards(1);
        });

    } */
}
