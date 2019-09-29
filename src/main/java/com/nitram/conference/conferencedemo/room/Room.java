package com.nitram.conference.conferencedemo.room;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Room {
    private @Id @GeneratedValue Long id;
    private String name;
    private String location;
    private Byte maxSeats;
    
    private Room() {}
    
    public Room(String name, String location, Byte maxSeats) {
		this.setName(name);
		this.setLocation(location);
		this.setMaxSeats(maxSeats);
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

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Byte getMaxSeats() {
		return maxSeats;
	}

	public void setMaxSeats(Byte maxSeats) {
		this.maxSeats = maxSeats;
	}
	
}