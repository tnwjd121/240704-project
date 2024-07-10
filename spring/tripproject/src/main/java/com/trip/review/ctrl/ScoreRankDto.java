package com.trip.review.ctrl;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ScoreRankDto {
	
	@JsonProperty("travel_info_id")
	private int travel_info_id;
	
	@JsonProperty("avg_score")
	private int avg_score;

}
