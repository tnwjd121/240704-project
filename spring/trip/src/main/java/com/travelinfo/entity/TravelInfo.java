// 여행정보등록을 나타내는 엔티티 클래스

package com.travelinfo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "travel_info")
public class TravelInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String country;

    @Column(nullable = false, length = 50)
    private String region;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 100)
    private String placeName;

    @Column(nullable = false, length = 100)
    private String address;

    @Column(nullable = false, length = 200)
    private String description;

    @Column(length = 200)
    private String photoUrl; // 파일 경로 또는 URL 저장
    
}
