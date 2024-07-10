package com.trip.review.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.trip.review.database.Review;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
	
	@Autowired
	ReviewServiece rServe;
	
	//여행지 아이디로 찾기
    @GetMapping("/Review/travelinfo={Id}")
    public List<Review> Login(@PathVariable("Id") Integer Id) {
    	return rServe.findReviewByTravelInfoID(Id);
    }
    
    //유저 아이디로 찾기
    @GetMapping("/Review/userId={Id}")
    public List<Review> UserInfo(@PathVariable("Id") String Id) {
    	return rServe.findReviewByUserId(Id);
    }
    
    //여행지 아이디 및 유저 아이디로 찾기
    @GetMapping("/Review/travelinfo={travelInfo_ID}&userId={user_ID}")
    public Review UserInfo(@PathVariable("Id") Integer TId, @PathVariable("Id") String UId) {
    	return rServe.findReviewByTIDAndUId(TId, UId);
    }
    
    //리뷰 작성
    @PostMapping("/Review/Write")
    public Boolean UserJoin(@RequestBody Review review) {
    	return rServe.reviewWrite(review);
    }
    
    //리뷰 삭제
    @DeleteMapping("/Review/Delete/id={Id}")
    public Boolean UserUnsub(@PathVariable("Id") Long Id) {
    	return rServe.reviewDelete(Id);
    }
    
    //리뷰 수정
	@PutMapping("/Review/Update")
    public Boolean User(@RequestBody Review review) {
    	return rServe.reviewUpdate(review);
    }
	
	
	
	
	//리뷰순 랭킹 조회
	@GetMapping("/Ranking/")
	public List<Review> RankingReviewCount(@PathVariable("Id") String Id) {
    	return rServe.findReviewByUserId(Id);
    }

	
	
	
	
	
	

}
