import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/airportDetail.css';

const { kakao } = window;

const KakaoAirport = ({ setDestinationCoords }) => {
  const [startAddress, setStartAddress] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById('airportMap');
    const mapOption = {
      center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 초기 중심 좌표 (대한민국 중심)
      level: 8, // 지도의 초기 확대 레벨
    };

    const mapInstance = new kakao.maps.Map(mapContainer, mapOption);
    setMap(mapInstance);

    const airports = [
      { name: '인천국제공항', lat: 37.4602, lng: 126.4407, url: 'https://www.airport.kr/ap/ko/index.do' },
      { name: '김포국제공항', lat: 37.558, lng: 126.791, url: 'https://www.airport.co.kr/gimpo/main.do' },
      { name: '제주국제공항', lat: 33.5104, lng: 126.4913, url: 'https://www.airport.co.kr/jeju/main.do' },
      { name: '김해국제공항', lat: 35.1798, lng: 128.9387, url: 'https://www.airport.co.kr/gimhae/main.do' },
      { name: '청주국제공항', lat: 36.7169, lng: 127.499, url: 'https://www.airport.co.kr/cheongju/main.do' },
      { name: '대구국제공항', lat: 35.8974, lng: 128.6553, url: 'https://www.airport.co.kr/daegu/main.do' },
      { name: '광주공항', lat: 35.1264, lng: 126.8087, url: 'https://www.airport.co.kr/gwangju/main.do' },
      { name: '무안국제공항', lat: 34.9914, lng: 126.3828, url: 'https://www.airport.co.kr/muan/main.do' },
      { name: '양양국제공항', lat: 38.0614, lng: 128.6692, url: 'https://www.airport.co.kr/yangyang/main.do' },
      { name: '여수공항', lat: 34.8429, lng: 127.615, url: 'https://www.airport.co.kr/yeosu/main.do' },
      { name: '울산공항', lat: 35.593, lng: 129.351, url: 'https://www.airport.co.kr/ulsan/main.do' },
      { name: '사천공항', lat: 35.076, lng: 128.0603, url: 'https://www.airport.co.kr/sacheon/main.do' },
      { name: '원주공항', lat: 37.4416, lng: 127.9606, url: 'https://www.airport.co.kr/wonju/main.do' },
      { name: '포항공항', lat: 35.9876, lng: 129.4205, url: 'https://www.airport.co.kr/pohang/main.do' },
      { name: '군산공항', lat: 35.9642, lng: 126.7167, url: 'https://www.airport.co.kr/gunsan/main.do' },
    ];

    const bounds = new kakao.maps.LatLngBounds();

    airports.forEach((airport) => {
      const markerPosition = new kakao.maps.LatLng(airport.lat, airport.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true,
      });

      marker.setMap(mapInstance);

      const customOverlayContent = `
        <div class="airport-label" onclick="window.open('${airport.url}', '_blank')">
          ${airport.name}
        </div>
      `;

      const customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: customOverlayContent,
        yAnchor: 1.5,
      });
      customOverlay.setMap(mapInstance);

      bounds.extend(markerPosition);
    });

    mapInstance.setBounds(bounds);
  }, []);

  const handleSearch = async () => {
    try {
      const geocoderUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(startAddress)}`;
      const headers = { Authorization: `KakaoAK 319544de936fb890f2a1d8e934ae6414` };

      const response = await axios.get(geocoderUrl, { headers });
      const data = response.data;

      if (data.documents.length > 0) {
        const startCoords = {
          lat: data.documents[0].y,
          lng: data.documents[0].x,
        };
        setStartCoords(startCoords);

        const markerPosition = new kakao.maps.LatLng(startCoords.lat, startCoords.lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });

        marker.setMap(map);
        map.setCenter(markerPosition);
      } else {
        alert('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching start coordinates:', error);
    }
  };

  const handleNavigate = () => {
    if (startCoords) {
      const url = `https://map.kakao.com/link/from/${startCoords.lat},${startCoords.lng}`;
      window.open(url, '_blank');
    } else {
      alert('출발지를 입력해 주세요.');
    }
  };

  return (
    <div className="way-container">
      <div className="way-search">
        <input
          type="text"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value)}
          placeholder="출발지를 입력하세요"
        />
        <div className="button-group">
          <button className="search-button" onClick={handleSearch}>검색</button>
          <button className="navigate-button" onClick={handleNavigate}>카카오 맵</button>
        </div>
      </div>
      <div className="airport-map-container">
        <div id="airportMap" className="airport-map"></div>
      </div>
    </div>
  );
};

export default KakaoAirport;
