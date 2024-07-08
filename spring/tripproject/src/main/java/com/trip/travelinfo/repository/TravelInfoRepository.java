package com.trip.travelinfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.trip.travelinfo.entity.TravelInfo;

@CrossOrigin
public interface TravelInfoRepository extends JpaRepository<TravelInfo, Integer> {
	
}
