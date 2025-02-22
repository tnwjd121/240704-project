import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/FesDetail.css'
import Kakao from '../Kakao'


export default function FFesDetail() {
  const [festival, setFestival] = useState(null)
  const { id } = useParams();

  useEffect(()=>{
    detailFes()
  },[id])

  const detailFes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/festivals/${id}`)
      setFestival(response.data)
    } catch (error) {
      console.error("상세페이지 에러: ", error);
    }
  }
  
  if(!festival) {
    return (
      <div className='body'>
        Loading...
      </div>
    )
  }
  
  return (
      <div id='fes-detail'>
        <h2>축제 상세</h2>
        <div id='fes-detail-info'>
          <div id='fes-detail-img'>
          <img src={festival.imageUrl} alt={festival.fesName}></img>
          </div>
          <div id='fes-detail-text'>
            <p><strong>축제 이름:</strong> {festival.fesName}</p>
            <p><strong>축제기간:</strong>{festival.startDate} ~ {festival.endDate}
            </p>
            <p><strong>요금:</strong> {festival.price}원</p>
            <p><strong>주최:</strong> {festival.host}</p>
            <p><strong>전화번호:</strong> {festival.phoneNumber}</p>
            <p><strong>주소:</strong> {festival.address}</p>
          </div>
        </div>
        <p id='description-fes'>
          <strong>상세:</strong> {festival.detail}
        </p>
        <p id='map-title'>상세 지도</p>
        <Kakao address={festival.address}/>
      </div>
  )
}