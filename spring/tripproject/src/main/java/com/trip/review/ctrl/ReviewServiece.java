package com.trip.review.ctrl;

import java.util.ArrayList;
import java.util.List;

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
		TravelInfo travelInfo = tRepo.findByID(review.getTravelInfoId());
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
		TravelInfo travelInfo = tRepo.findByID(review.getTravelInfoId());
	    User user = uRepo.findbyID(review.getUserId());
	    
	    Review newReview = new Review();
	    newReview.setTravelInfo(travelInfo);
	    newReview.setUser(user);
	    newReview.setScore(review.getScore());
	    newReview.setContents(review.getContents());

	    rRepo.save(newReview);
	}
	
	 public List<RankDto> ReviewRanking() {
	        List<Object[]> results = rRepo.reviewRanking();
	        List<RankDto> rankDtos = new ArrayList<RankDto>();

	        for (Object[] result : results) {
	            Long travelInfoId = ((Number) result[0]).longValue();
	            Long reviewCount = ((Number) result[1]).longValue();
	            Double avgScore = ((Number) result[2]).doubleValue();
	            RankDto rankDto = new RankDto(travelInfoId, reviewCount, avgScore);
	            rankDtos.add(rankDto);
	        }
	        
	        return rankDtos;
	 }
	
}
