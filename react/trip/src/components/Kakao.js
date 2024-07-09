import axios from 'axios';
import React, { useEffect, useState } from 'react'
const {kakao} = window;

export default function Kakao({address}) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const API_KEY = '319544de936fb890f2a1d8e934ae6414';


  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
          {
            headers: {
              Authorization: `KakaoAK ${API_KEY}`
            }
          }
        );

        const data = response.data;
        if (data.documents.length > 0) {
          const firstResult = data.documents[0];
          setLatitude(firstResult.y);
          setLongitude(firstResult.x);
        } else {
          console.log('검색 결과가 없습니다.');
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchCoordinates();
  }, [address]); // address가 변경될 때마다 좌표를 다시 가져옴

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3
      };
      const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

      // 마커 표시
      const markerPosition = new kakao.maps.LatLng(latitude, longitude);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    }
  }, [latitude, longitude]);


  return (
    <div id="map" style={{width:'50rem', height:'27rem'}}></div>
  )
}
