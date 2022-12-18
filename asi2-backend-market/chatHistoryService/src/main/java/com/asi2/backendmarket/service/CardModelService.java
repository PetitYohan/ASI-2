package com.asi2.backendmarket.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ChatHistoryService {

    @Autowired
    ModelMapper mapper;

    @Autowired
    private UserRestConsumer userRestConsumer;

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    public List<ChatHistoryDTO> getAll() {
        List<ChatHistoryDTO> listCHD = new ArrayList<ChatHistoryDTO>();
        return listCHD
                .stream()
                .map(entry -> mapper.map(entry, ChatHistoryDto.class))
                .collect(Collectors.toList());
    }

    public List<ChatHistoryDTO> getAllBySrcId(Integer srcId) {
        List<ChatHistoryDTO> listCHD = new ArrayList<ChatHistoryDTO>();

        try {
            userRestConsumer.get(srcId.toString());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id: " + srcId + " not found", null);
        }

        return chatHistoryRepository.findBySrcId(srcId)
                .stream()
                .map(entry -> mapper.map(entry, ChatHistoryDto.class))
                .collect(Collectors.toList());
    }

    public List<ChatHistoryDTO> getAllByDestId(Integer destId) {
        List<ChatHistoryDTO> listCHD = new ArrayList<ChatHistoryDTO>();

        try {
            userRestConsumer.get(destId.toString());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id: " + srcId + " not found", null);
        }

        return chatHistoryRepository.findByDstId(srcId)
                .stream()
                .map(entry -> mapper.map(entry, ChatHistoryDto.class))
                .collect(Collectors.toList());
    }

}
