package com.trip.review.ctrl;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RankDto {
    private Long travelInfoId;
    private Long reviewCount;
    private Double avgScore;

    public RankDto(Long travelInfoId, Long reviewCount, Double avgScore) {
        this.travelInfoId = travelInfoId;
        this.reviewCount = reviewCount;
        this.avgScore = avgScore;
    }

}
