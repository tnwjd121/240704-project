package com.travelinfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelinfo.entity.TravelInfo;

public interface TravelInfoRepository extends JpaRepository<TravelInfo, Integer> {
	
}