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
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "travel_info_id")
    private TravelInfo travelInfo;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private Integer score;
    
    private String contents;
}
