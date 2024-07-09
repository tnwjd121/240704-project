package com.trip.review.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface ReviewRepo extends JpaRepository<Review, Long> {
    
    @Query(value = "SELECT * FROM trip.review WHERE travelInfo_ID LIKE :travelInfo_ID", nativeQuery = true)
    List<Review> findByTravelInfoId(@Param("travelInfo_ID") Integer travelInfoId);
    
    @Query(value = "SELECT * FROM trip.review WHERE user_ID LIKE :user_ID", nativeQuery = true)
    List<Review> findByUserId(@Param("user_ID") String userId);
    
    @Query(value = "SELECT * FROM trip.review Where WHERE travelInfo_ID LIKE :travelInfo_ID AND user_ID LIKE :user_ID")
	Review findByTIDAndUId(@Param("travelInfo_ID") Integer travelInfoId, @Param("user_ID") String userId);
}
