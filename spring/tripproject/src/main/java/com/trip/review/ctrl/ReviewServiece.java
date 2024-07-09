package com.trip.review.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.trip.review.database.Review;
import com.trip.review.database.ReviewRepo;

public class ReviewServiece {
	
	@Autowired
	ReviewRepo rRepo; 
	
	public List<Review> findReviewByTravelInfoID(Integer travelInfo_ID) {
		return rRepo.findByTravelInfoId(travelInfo_ID);
	}
	
	public List<Review> findReviewByUserId(String userId) {
		return rRepo.findByUserId(userId);
	}
	
	public boolean reviewWrite(Review review) {
		rRepo.save(review);
		return true;
	}
	
	public boolean reviewDelete(Long Id) {
		
		rRepo.deleteById(Id);
		return true;
	}
	
	public boolean reviewUpdate(Review review) {
		rRepo.save(review);
		return true;
	}
	

}
