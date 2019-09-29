package com.nitram.conference.conferencedemo.conference;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Conference {
    private @Id @GeneratedValue Long id;
	private Long roomId;
    private String name;
    private LocalDateTime dateTime;
    
    private Conference() {}

    public Conference(Long roomId, String name, LocalDateTime dateTime) {
    	this.setRoomId(roomId);
    	this.setName(name);
    	this.setDateTime(dateTime);
    }
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
	public LocalDateTime getDateTime() {
		return dateTime;
	}
	
	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public Long getRoomId() {
		return roomId;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}
}