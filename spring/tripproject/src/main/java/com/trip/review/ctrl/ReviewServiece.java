package com.trip.review.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.trip.review.database.Review;
import com.trip.review.database.ReviewRepo;

@CrossOrigin
@Service
public class ReviewServiece {
	
	@Autowired
	ReviewRepo rRepo; 
	
	public List<Review> findReviewByTravelInfoID(Integer travelInfo_ID) {
		return rRepo.findByTravelInfoId(travelInfo_ID);
	}
	
	public List<Review> findReviewByUserId(String userId) {
		return rRepo.findByUserId(userId);
	}
	
	public Review findReviewByTIDAndUId(Integer travelInfo_ID, String userId) {
		return rRepo.findByTIDAndUId(travelInfo_ID, userId);
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
	
	public List<Review> RankingReviewCount() {
		return (List<Review>) rRepo.rankByRCount();
	}
	
	public List<Review> RankingReviewScore() {
		return (List<Review>) rRepo.rankByRScore();
	}
}
