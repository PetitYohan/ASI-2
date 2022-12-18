package com.asi2.backendmarket.controller;

import java.util.List;

import com.asi2.backendmarket.dto.card.CardDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.asi2.backendmarket.rest.card.ICardRest;
import com.asi2.backendmarket.service.ChatHistoryService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin
@RestController
public class ChatHistoryController {

    private final static Logger LOG = LoggerFactory.getLogger(ChatHistoryController.class);

    @Autowired
    ChatHistoryService chatHistoryService;


    public List<ChatHistoryDTO> getAll() {
        List<ChatHistoryDTO> listCHD = new ArrayList<ChatHistoryDTO>();
        for (ChatHistoryModel cHM : chatHistoryRepository.findAll()) {
            listCHD.add(ChatHistoryMapper.fromModelToDto(cHM));
        }
        return listCHD;
    }

    public List<ChatHistoryDTO> getAllBySrcId(Integer srcId) {
        List<ChatHistoryDTO> listCHD = new ArrayList<ChatHistoryDTO>();

        try {
            userRestConsumer.get(srcId.toString());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id:" + srcId + " not found", null);
        }

        for (ChatHistoryModel cHM : chatHistoryRepository.findBySrcId(srcId)) {
            listCHD.add(ChatHistoryMapper.fromModelToDto(cHM));
        }
        return listCHD;
    }

    public List<ChatHistoryDTO> getAllByDestId(Integer destId) {
        List<ChatHistoryDTO> listCHD = new ArrayList<ChatHistoryDTO>();

        try {
            userRestConsumer.get(destId.toString());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id:" + destId + " not found", null);
        }

        for (ChatHistoryModel cHM : chatHistoryRepository.findByDestId(destId)) {
            listCHD.add(ChatHistoryMapper.fromModelToDto(cHM));
        }
        return listCHD;
    }


}
