import axios from 'axios';
import React, { useState } from 'react';
import '../css/wayDetail.css';

const { kakao } = window;

const KakaoWay = ({ destinationName }) => {
  const [startAddress, setStartAddress] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [destinationDisplayName, setDestinationDisplayName] = useState('');
  const API_KEY = '319544de936fb890f2a1d8e934ae6414'; // 여기에 실제 Kakao REST API 키를 넣으세요

  const handleSearch = async () => {
    try {
      const geocoderUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(startAddress)}`;
      const headers = { Authorization: `KakaoAK ${API_KEY}` };

      const startResponse = await axios.get(geocoderUrl, { headers });
      const startData = startResponse.data;

      console.log('Start Data:', startData);

      if (startData.documents.length > 0) {
        const startCoords = {
          lat: startData.documents[0].y,
          lng: startData.documents[0].x,
        };
        setStartCoords(startCoords);

        const endResponse = await axios.get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(destinationName)}`,
          { headers }
        );
        const endData = endResponse.data;

        console.log('End Data:', endData);

        if (endData.documents.length > 0) {
          const endCoords = {
            lat: endData.documents[0].y,
            lng: endData.documents[0].x,
          };
          setEndCoords(endCoords);
          setDestinationDisplayName(destinationName); // 도착지 이름 설정
          getCarDirection(startCoords, endCoords);
        } else {
          alert('도착지 주소를 찾을 수 없습니다.');
        }
      } else {
        alert('출발지 주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('좌표 변환 중 오류 발생:', error);
    }
  };

  const getCarDirection = async (startCoords, endCoords) => {
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';
    const origin = `${startCoords.lng},${startCoords.lat}`;
    const destination = `${endCoords.lng},${endCoords.lat}`;
    
    const headers = {
      Authorization: `KakaoAK ${API_KEY}`,
      'Content-Type': 'application/json'
    };
  
    const queryParams = new URLSearchParams({
      origin: origin,
      destination: destination
    });
    
    const requestUrl = `${url}?${queryParams}`; // 파라미터까지 포함된 전체 URL

    try {
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Route data received:', data);
      
      const linePath = [];
      data.routes[0].sections.forEach(section => {
        section.roads.forEach(road => {
          road.vertexes.forEach((vertex, index) => {
            if (index % 2 === 0) {
              linePath.push(new kakao.maps.LatLng(road.vertexes[index + 1], vertex));
            }
          });
        });
      });

      const container = document.getElementById('wayMap');
      const options = {
        center: new kakao.maps.LatLng(startCoords.lat, startCoords.lng),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      const startMarkerPosition = new kakao.maps.LatLng(startCoords.lat, startCoords.lng);
      const startMarker = new kakao.maps.Marker({
        position: startMarkerPosition,
      });
      startMarker.setMap(map);

      const endMarkerPosition = new kakao.maps.LatLng(endCoords.lat, endCoords.lng);
      const endMarker = new kakao.maps.Marker({
        position: endMarkerPosition,
      });
      endMarker.setMap(map);

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#000000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });

      polyline.setMap(map);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const handleNavigate = () => {
    if (startCoords && endCoords) {
      const startName = encodeURIComponent(startAddress);
      const destinationUrl = `https://map.kakao.com/link/from/${startName},${startCoords.lat},${startCoords.lng}/to/${destinationName},${endCoords.lat},${endCoords.lng}`;
      window.open(destinationUrl, '_blank');
    } else {
      alert('출발지 또는 도착지 좌표를 찾을 수 없습니다.');
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
      <div className="map-container">
        {destinationDisplayName && (
          <div className="destination-info">
            도착지: {destinationDisplayName}
          </div>
        )}
        <div id="wayMap" className="way-map"></div>
      </div>
    </div>
  );
};

export default KakaoWay;
