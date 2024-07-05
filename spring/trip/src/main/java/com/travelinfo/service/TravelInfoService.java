package com.travelinfo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelinfo.entity.TravelInfo;
import com.travelinfo.repository.TravelInfoRepository;

@Service
public class TravelInfoService {

    @Autowired
    private TravelInfoRepository travelInfoRepository;

    public TravelInfo saveTravelInfo(TravelInfo travelInfo) {
        return travelInfoRepository.save(travelInfo);
    }

    public List<TravelInfo> getAllTravelInfo() {
        return travelInfoRepository.findAll();
    }
}
