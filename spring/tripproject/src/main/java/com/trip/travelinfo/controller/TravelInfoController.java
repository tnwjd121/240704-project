package com.trip.travelinfo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trip.travelinfo.entity.TravelInfo;
import com.trip.travelinfo.service.TravelInfoService;

@RestController
@RequestMapping("/api/travel-info")
public class TravelInfoController {

    private final TravelInfoService travelInfoService;

    @Autowired
    public TravelInfoController(TravelInfoService travelInfoService) {
        this.travelInfoService = travelInfoService;
    }

    // 여행 정보 등록
    @PostMapping("/add")
    public TravelInfo createTravelInfo(@RequestBody TravelInfo travelInfo) {
        return travelInfoService.saveTravelInfo(travelInfo);
    }

    // 모든 여행 정보 조회
    @GetMapping("/all")
    public List<TravelInfo> getAllTravelInfo() {
        return travelInfoService.getAllTravelInfo();
    }
}
