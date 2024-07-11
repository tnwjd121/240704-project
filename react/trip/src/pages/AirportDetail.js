import React from 'react';
import KakaoAirport from '../components/KakaoAirport';
import '../css/airportDetail.css';
import '../css/wayDetail.css';

const AirportDetail = () => {
  return (
    <div className="body">
      <div>
        <h1>공항편 정보</h1>
        <KakaoAirport />
      </div>
    </div>
  );
};

export default AirportDetail;
