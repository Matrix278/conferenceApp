package com.nitram.conference.conferencedemo.conference;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200", "http://localhost:5000" })
@RestController
public class ConferenceResource {

	@Autowired
	private ConferenceRepository conferenceRepository;
	
	@RequestMapping("/api/conferences")
	public List<Conference> retrieveAllConferences(){
		return conferenceRepository.findAll();
	}
	
	@GetMapping("/api/conferences/{id}")
	public Conference retrieveConference(@PathVariable long id) {
		Optional<Conference> conference = conferenceRepository.findById(id);
		return conference.get();
	}

	@DeleteMapping("/api/conferences/{id}")
	public void deleteConference(@PathVariable long id) {
		conferenceRepository.deleteById(id);
	}

	@PostMapping("/api/conferences")
	public ResponseEntity<Object> createConference(@RequestBody Conference conference) {
		Conference savedConference = conferenceRepository.save(conference);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedConference.getId()).toUri();

		return ResponseEntity.created(location).build();

	}
	
	@PutMapping("/api/conferences/{id}")
	public ResponseEntity<Object> updateConference(@RequestBody Conference conference, @PathVariable long id) {

		Optional<Conference> conferenceOptional = conferenceRepository.findById(id);

		if (!conferenceOptional.isPresent())
			return ResponseEntity.notFound().build();

		conference.setId(id);
		
		conferenceRepository.save(conference);

		return ResponseEntity.noContent().build();
	}
}