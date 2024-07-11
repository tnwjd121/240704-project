package com.trip.review.ctrl;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RankDto {
	
	@JsonProperty("id")
    private Long id;
    
	@JsonProperty("count(*)")
	private int count;
	
	@JsonProperty("avg_score")
    private float avgScore;

}
