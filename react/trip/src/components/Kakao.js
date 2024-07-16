import axios from 'axios';
import React, { useEffect, useState } from 'react'
const {kakao} = window;

export default function Kakao({address}) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null)
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
          setError(null)
        } else {
          console.log('검색 결과가 없습니다.');
          setError('API 호출 오류');
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
    <>
    {error ? (
      <div style={{ position: 'relative', width: '50rem', height: '27rem', margin: '0 auto'}}>
        <a href='https://www.google.co.kr/maps/?hl=ko&entry=ttu'
          target='_blank'
        >
          <img 
          src="https://i.namu.wiki/i/4LvjMNoCRJNjoJHyLj9_pbAqNHOOXZDnBogvcIKrpiqBf4qAAGQ3oGJQn6X7a_2IEaV-OSIFp-QvIf38oACKcA.webp"
          alt="Error"
          style={{ width: '50rem', height: '27rem', objectFit: 'cover' }}
          />
          <img
          src='https://download.logo.wine/logo/Google_Maps/Google_Maps-Logo.wine.png' 
          style={{
            width:'40rem', 
            height:'25rem',
            position:'absolute',
            top:'50%',
            left:"50%",
            transform:'translate(-50%, -50%)'
          }}
          alt='googleMap'
          id='google-map'
          >
        </img>
      </a>
      </div>
    ) : (
      <div id="map" style={{width:'50rem', height:'27rem'}}></div>
    )}
    </>
  )
}
