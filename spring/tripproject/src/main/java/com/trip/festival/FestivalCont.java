package com.trip.festival;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FestivalCont {
	
	@Autowired
	FestivalRepo fRepo;
	
	@GetMapping("/festivals")
	@CrossOrigin(origins = "http://localhost:3000")
	public Iterable<Festival> getFestivals(){
		return fRepo.findAll();
	}
}