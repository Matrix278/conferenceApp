package com.nitram.conference.conferencedemo.participant;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Participant {
    private @Id @GeneratedValue Long id;
    private Long conferenceId;
    private String fullName;
    private String birthDate;
    
    private Participant() {}
    
    public Participant(Long conferenceId, String fullName, String birthDate) {
    	this.setConferenceId(conferenceId);
    	this.setFullName(fullName);
    	this.setBirthDate(birthDate);
    }
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getConferenceId() {
		return conferenceId;
	}

	public void setConferenceId(Long conferenceId) {
		this.conferenceId = conferenceId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	
}