package com.trip.review.database;

import com.trip.travelinfo.entity.TravelInfo;
import com.trip.userdata.database.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    
    @ManyToOne
    @JoinColumn(name = "travelInfo_ID")
    private TravelInfo travelInfo_ID;
    
    @ManyToOne
    @JoinColumn(name = "user_ID")
    private User user_ID;
    
    private Integer score;
    
    private String contents;
}
