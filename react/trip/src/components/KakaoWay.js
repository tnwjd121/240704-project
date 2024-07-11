import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/wayDetail.css';

const { kakao } = window;

const KakaoWay = ({ destinationName }) => {
  const [startAddress, setStartAddress] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const API_KEY = '319544de936fb890f2a1d8e934ae6414';

  const handleSearch = async () => {
    try {
      const geocoderUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(startAddress)}`;
      const headers = { Authorization: `KakaoAK ${API_KEY}` };

      const startResponse = await axios.get(geocoderUrl, { headers });
      const startData = startResponse.data;

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

        if (endData.documents.length > 0) {
          const endCoords = {
            lat: endData.documents[0].y,
            lng: endData.documents[0].x,
          };
          setEndCoords(endCoords);
          setIsSearch(true);
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

  useEffect(() => {
    if (startCoords && endCoords) {
      const container = document.getElementById('wayMap');
      const options = {
        center: new kakao.maps.LatLng(startCoords.lat, startCoords.lng),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      // 출발지 마커 생성
      const startMarkerPosition = new kakao.maps.LatLng(startCoords.lat, startCoords.lng);
      const startMarker = new kakao.maps.Marker({
        position: startMarkerPosition,
      });
      startMarker.setMap(map);

      // 도착지 마커 생성
      const endMarkerPosition = new kakao.maps.LatLng(endCoords.lat, endCoords.lng);
      const endMarker = new kakao.maps.Marker({
        position: endMarkerPosition,
      });
      endMarker.setMap(map);

      // 경로 그리기
      const linePath = [
        new kakao.maps.LatLng(startCoords.lat, startCoords.lng),
        new kakao.maps.LatLng(endCoords.lat, endCoords.lng),
      ];

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#000000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });

      polyline.setMap(map);
    }
  }, [startCoords, endCoords]);

  return (
    <div className="way-container">
      <div className="way-search">
        <input
          type="text"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value)}
          placeholder="출발지를 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div id="wayMap" className="way-map"></div>
    </div>
  );
};

export default KakaoWay;
