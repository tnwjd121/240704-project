package com.trip.travelinfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trip.travelinfo.entity.TravelInfo;

public interface TravelInfoRepository extends JpaRepository<TravelInfo, Integer> {
	
}
