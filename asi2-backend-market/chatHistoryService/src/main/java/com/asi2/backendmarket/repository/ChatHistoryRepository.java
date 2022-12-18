package com.asi2.backendmarket.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.asi2.backendmarket.model.ChatHistoryModel;

public interface ChatHistoryRepository extends CrudRepository<ChatHistoryModel, Integer> {
    List<ChatHistoryModel> findBySrcId(Integer srcId);
    List<ChatHistoryModel> findByDstId(Integer dstId);
}
