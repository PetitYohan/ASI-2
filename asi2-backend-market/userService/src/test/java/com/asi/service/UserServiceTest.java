package com.asi2.backendmarket.service;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import com.asi2.backendmarket.dto.card.CardDto;
import com.asi2.backendmarket.model.UserModel;
import com.asi2.backendmarket.repository.UserRepository;
import com.asi2.backendmarket.rest.card.CardRestConsumer;
import com.asi2.backendmarket.service.UserService;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    @Spy
    UserService userService;

    @Mock
    UserRepository userRepositoryMock;

    @Mock
    CardRestConsumer cardRestConsumerMock;

    private List<CardDto> listWithCards = Arrays
            .asList(new CardDto[] { new CardDto(), new CardDto(), new CardDto() });

    private List<CardDto> listWithoutCards = Arrays.asList(new CardDto[] {});

    // =========== addUser ===========
    //TODO
    /* @Test
    void testAddUserWithCards() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 100, "pwd");
        when(cardRestConsumerMock.generateCardsForNewUser(user.getIdUser()))
                .thenReturn(ResponseEntity.ok(listWithCards));
        Assertions.assertThat(userService.addUser(user)).isTrue();
    }

    @Test
    void testAddUserWithoutCards() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 100, "pwd");
        when(cardRestConsumerMock.generateCardsForNewUser(user.getIdUser()))
                .thenReturn(ResponseEntity.ok(listWithoutCards));
        Assertions.assertThat(userService.addUser(user)).isFalse();
    }

    @Test
    void testAddUserWithException() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 100, "pwd");
        when(cardRestConsumerMock.generateCardsForNewUser(user.getIdUser())).thenThrow(RuntimeException.class);
        Assertions.assertThat(userService.addUser(user)).isFalse();
    } */

    // =========== isValidUserRegistration ===========
    //TODO move to auth test
    /* @Test
    void testIsValidUserRegistrationUserAlreadyPresent() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 100, "pwd");
        doReturn(true).when(userService).isInDatabase(user);
        Assertions.assertThat(userService.isValidUserRegistration(user)).isFalse();
    }

    @Test
    void testIsValidUserRegistrationUserWithoutName() {
        UserModel user = new UserModel(1, null, "TestSurname", "TestEmail", 100, "pwd");
        doReturn(false).when(userService).isInDatabase(user);
        Assertions.assertThat(userService.isValidUserRegistration(user)).isFalse();
    }

    @Test
    void testIsValidUserRegistrationUserWithoutSurname() {
        UserModel user = new UserModel(1, "TestName", "", "TestEmail", 100, "pwd");
        doReturn(true).when(userService).isInDatabase(user);
        Assertions.assertThat(userService.isValidUserRegistration(user)).isFalse();
    }

    @Test
    void testIsValidUserRegistration() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 100, "pwd");
        doReturn(true).when(userService).isInDatabase(user);
        Assertions.assertThat(userService.isValidUserRegistration(user)).isFalse();
    } */
    
    // =========== changeMoneyOfUser ===========
    @Test
    void testChangeMoneyOfUserWithNoMoney() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 0, "pwd");
        Assertions.assertThat(userService.changeMoneyOfUser(1, -100)).isFalse();
    }

    @Test
    void testChangeMoneyOfUserWithExeception() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 200, "pwd");
        when(userRepositoryMock.save(user)).thenThrow(RuntimeException.class);
        Assertions.assertThat(userService.changeMoneyOfUser(1, -100)).isFalse();
    }

    @Test
    void testChangeMoneyOfUser() {
        UserModel user = new UserModel(1, "TestName", "TestSurname", "TestEmail", 200, "pwd");
        Assertions.assertThat(userService.changeMoneyOfUser(1, -100)).isTrue();
    }

}
