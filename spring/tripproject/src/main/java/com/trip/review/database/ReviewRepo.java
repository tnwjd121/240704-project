package com.trip.review.database;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface ReviewRepo extends JpaRepository<Review, Long> {
    
    @Query(value = "SELECT * FROM review WHERE travelInfo_ID = :travelInfo_ID", nativeQuery = true)
    List<Review> findByTravelInfoId(@Param("travelInfo_ID") Integer travelInfoId);
    
    @Query(value = "SELECT * FROM review WHERE user_ID = :user_ID", nativeQuery = true)
    List<Review> findByUserId(@Param("user_ID") String userId);
    
    @Query(value = "SELECT * FROM review WHERE travelInfo_ID = :travelInfo_ID AND user_ID = :user_ID", nativeQuery = true)
    Review findByTIDAndUId(@Param("travelInfo_ID") Integer travelInfoId, @Param("user_ID") String userId);
    
    @Query(value = "SELECT travel_info_id, AVG(score) AS avg_score FROM trip.review GROUP BY travel_info_id;", nativeQuery = true)
    Review rankByRScore();
    
    @Query(value = "SELECT travel_info_id, count(*) FROM trip.review GROUP BY travel_info_id;", nativeQuery = true)
    Review rankByRCount();	
}
