package com.nitram.conference.conferencedemo.participant;

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
public class ParticipantResource {

	@Autowired
	private ParticipantRepository participantRepository;
	
	@RequestMapping("/api/participants")
	public List<Participant> retrieveAllParticipants(){
		return participantRepository.findAll();
	}
	
	@GetMapping("/api/participants/{id}")
	public Participant retrieveParticipant(@PathVariable long id) {
		Optional<Participant> participant = participantRepository.findById(id);
		return participant.get();
	}

	@DeleteMapping("/api/participants/{id}")
	public void deleteParticipant(@PathVariable long id) {
		participantRepository.deleteById(id);
	}

	@PostMapping("/api/participants")
	public ResponseEntity<Object> createParticipant(@RequestBody Participant participant) {
		Participant savedParticipant = participantRepository.save(participant);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedParticipant.getId()).toUri();

		return ResponseEntity.created(location).build();

	}
	
	@PutMapping("/api/participants/{id}")
	public ResponseEntity<Object> updateParticipant(@RequestBody Participant participant, @PathVariable long id) {

		Optional<Participant> participantOptional = participantRepository.findById(id);

		if (!participantOptional.isPresent())
			return ResponseEntity.notFound().build();

		participant.setId(id);
		
		participantRepository.save(participant);

		return ResponseEntity.noContent().build();
	}
}