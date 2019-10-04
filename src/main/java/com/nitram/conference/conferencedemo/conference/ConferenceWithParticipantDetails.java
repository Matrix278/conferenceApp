package com.nitram.conference.conferencedemo.conference;

import java.time.LocalDateTime;

public class ConferenceWithParticipantDetails {
    private Long id;
    private Long roomId;
    private String name;
    private LocalDateTime dateTime;
    private Short maxSeats;
    private Short availableSeats;

    private ConferenceWithParticipantDetails() {}

    public ConferenceWithParticipantDetails(Long id, Long roomId, String name, LocalDateTime dateTime, Short maxSeats, Short availableSeats) {
        this.id = id;
        this.roomId = roomId;
        this.name = name;
        this.dateTime = dateTime;
        this.maxSeats = maxSeats;
        this.availableSeats = availableSeats;
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

    public Short getMaxSeats() {
        return maxSeats;
    }

    public void setMaxSeats(Short maxSeats) {
        this.maxSeats = maxSeats;
    }

    public Short getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Short availableSeats) {
        this.availableSeats = availableSeats;
    }
}
