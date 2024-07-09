package com.trip.festival;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface FestivalRepo extends JpaRepository<Festival, Integer>{
	
}
