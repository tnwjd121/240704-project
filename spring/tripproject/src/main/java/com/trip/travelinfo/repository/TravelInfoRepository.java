package com.trip.travelinfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.trip.travelinfo.entity.TravelInfo;

@CrossOrigin
public interface TravelInfoRepository extends JpaRepository<TravelInfo, Integer> {
	
	@Query(value = "SELECT * FROM trip.travel_info WHERE ID LIKE :id", nativeQuery = true)
	TravelInfo findbyID(@Param("id") Integer Id);
	
}
