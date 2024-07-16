import React, { useEffect, useState } from 'react';
import Kakao from '../components/Kakao';
import KakaoWay from '../components/KakaoWay'; // KakaoWay 컴포넌트 임포트
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../components/Api';
import '../css/wayDetail.css';

const WayDetail = () => {
  const { id } = useParams();
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationName, setDestinationName] = useState('');

  useEffect(() => {
    const fetchDestinationAddress = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/travelInfoes/${id}`);
        setDestinationAddress(response.data.address);
        setDestinationName(response.data.placeName);
      } catch (error) {
        console.error('Error fetching destination address:', error);
      }
    };
    fetchDestinationAddress();
  }, [id]);

  useEffect(() => {
    const fetchDestinationAddress = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/festivals/${id}`);
        setDestinationAddress(response.data.address);
        setDestinationName(response.data.fesName);
      } catch (error) {
        console.error('Error fetching destination address:', error);
      }
    };
    fetchDestinationAddress();
  }, [id]);

  return (
    <div className='body'>
      <div>
        <h1>길찾기 지도</h1>
        {destinationName && (
          <KakaoWay destinationName={destinationName} />
        )}
      </div>
    </div>
  );
};

export default WayDetail;
