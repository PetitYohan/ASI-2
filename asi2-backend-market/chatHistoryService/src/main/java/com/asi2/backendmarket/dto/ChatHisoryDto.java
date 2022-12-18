package com.asi2.backendmarket.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

public class ChatHistoryDto  {

	private Integer id;
	private Integer srcId;
	private Integer dstId;
	private String content;
	private java.sql.Timestamp timestamp;

	public ChatHistoryModel() {
	}
	
	public ChatHistoryModel(Integer srcId, Integer dstId, Timestamp timestamp, String content) {
		this.srcId = srcId;
		this.dstId = dstId;
		this.timestamp = timestamp;
		this.content = content;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSrcId() {
		return srcId;
	}

	public void setSrcId(Integer srcId) {
		this.srcId = srcId;
	}

	public Integer getDstId() {
		return dstId;
	}

	public void setDstId(Integer dstId) {
		this.dstId = dstId;
	}

	public java.sql.Timestamp getTime() {
		return timestamp;
	}

	public void setTime(java.sql.Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
