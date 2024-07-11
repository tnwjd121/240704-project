package com.trip.review.ctrl;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReviewDto {
	
	@JsonProperty("id")
    private Integer id;
    
	@JsonProperty("travel_info_id")
	private int travelInfoId;
	
	@JsonProperty("user_id")
	private String userId;
    
	@JsonProperty("score")
    private Integer score;
    
	@JsonProperty("contents")
    private String contents;
	


	

}
