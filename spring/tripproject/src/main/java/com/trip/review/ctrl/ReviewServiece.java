package com.trip.review.ctrl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.trip.review.database.Review;
import com.trip.review.database.ReviewRepo;
import com.trip.travelinfo.entity.TravelInfo;
import com.trip.travelinfo.repository.TravelInfoRepository;
import com.trip.userdata.database.User;
import com.trip.userdata.database.UserRepo;

@CrossOrigin
@Service
public class ReviewServiece {
	
	@Autowired
	ReviewRepo rRepo;
	
	@Autowired
	TravelInfoRepository tRepo;
	
	@Autowired
	UserRepo uRepo;
	
	public List<Review> findReviewByTravelInfoID(Integer travelInfoID) {
		return rRepo.findByTravelInfoId(travelInfoID);
	}
	
	public List<Review> findReviewByUserId(String userId) {
		return rRepo.findByUserId(userId);
	}
	
	public Review findReviewByTIDAndUId(Integer travelInfoID, String userId) {
		return rRepo.findByTIDAndUId(travelInfoID, userId);
	}
	
	public void reviewWrite(ReviewDto review) {
		TravelInfo travelInfo = tRepo.findbyID(review.getTravelInfoId());
	    User user = uRepo.findbyID(review.getUserId());
	    
	    Review newReview = new Review();
	    newReview.setTravelInfo(travelInfo);
	    newReview.setUser(user);
	    newReview.setScore(review.getScore());
	    newReview.setContents(review.getContents());

	    rRepo.save(newReview);
	}
	
	public void reviewDelete(Long Id) {
		rRepo.deleteById(Id);
	}
	
	public void reviewUpdate(ReviewDto review) {
		TravelInfo travelInfo = tRepo.findbyID(review.getTravelInfoId());
	    User user = uRepo.findbyID(review.getUserId());
	    
	    Review newReview = new Review();
	    newReview.setTravelInfo(travelInfo);
	    newReview.setUser(user);
	    newReview.setScore(review.getScore());
	    newReview.setContents(review.getContents());

	    rRepo.save(newReview);
	}
	
	public List<CountRankDto> RankingReviewCount() {
		return (List<CountRankDto>) rRepo.rankByRCount();
	}
	
	public List<ScoreRankDto> RankingReviewScore() {
		return (List<ScoreRankDto>) rRepo.rankByRScore();
	}
}
