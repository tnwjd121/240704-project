import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SERVER_URL } from '../components/Api';
import { useParams } from 'react-router-dom';
import '../css/tripDetail.css'
import Kakao from '../components/Kakao';


export default function TripDetail() {
  const [trip, setTrip] = useState(null)
  const { id } = useParams();

  useEffect(()=>{
    detailTrip()
  },[id])

  const detailTrip = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/travelInfoes/${id}`)
      setTrip(response.data)
    } catch (error) {
      console.error("상세페이지 에러: ", error);
    }
  }
  if(!trip) {
    return (
      <div className='body'>
        Loading...
      </div>
    )
  }



  return (
    <div className='body'>
      <div id='trip-detail'>
        <h2>상세페이지</h2>
        <div id='trip-detail-info'>
          <div id='trip-detail-img'>
          <img src={trip.photoUrl} alt={trip.placeName}></img>
          </div>
          <div id='trip-detail-text'>
            <p><strong>장소명:</strong> {trip.placeName}</p>
            <p><strong>나라:</strong> {trip.country}</p>
            <p><strong>지역:</strong> {trip.region}</p>
            <p><strong>카테고리:</strong> {trip.category}</p>
            <p><strong>상세:</strong> {trip.description}</p>
            <p><strong>주소:</strong> {trip.address}</p>
          </div>
        </div>
        <Kakao/>
      </div>
    </div>
  )
}
