package com.nitram.conference.conferencedemo.room;

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
public class RoomResource {

	@Autowired
	private RoomRepository roomRepository;
	
	@RequestMapping("/api/rooms")
	public List<Room> retrieveAllRooms(){
		return roomRepository.findAll();
	}
	
	@GetMapping("/api/rooms/{id}")
	public Room retrieveRoom(@PathVariable long id) {
		Optional<Room> room = roomRepository.findById(id);
		return room.get();
	}

	@DeleteMapping("/api/rooms/{id}")
	public void deleteRoom(@PathVariable long id) {
		roomRepository.deleteById(id);
	}

	@PostMapping("/api/rooms")
	public ResponseEntity<Object> createRoom(@RequestBody Room room) {
		Room savedRoom = roomRepository.save(room);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedRoom.getId()).toUri();

		return ResponseEntity.created(location).build();

	}
	
	@PutMapping("/api/rooms/{id}")
	public ResponseEntity<Object> updateRoom(@RequestBody Room room, @PathVariable long id) {

		Optional<Room> roomOptional = roomRepository.findById(id);

		if (!roomOptional.isPresent())
			return ResponseEntity.notFound().build();

		room.setId(id);
		
		roomRepository.save(room);

		return ResponseEntity.noContent().build();
	}
}