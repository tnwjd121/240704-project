import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import '../css/tripModal.css'
import { FaLongArrowAltUp } from 'react-icons/fa'
import axios from 'axios';

export default function TripModal({trip, fetchTrip}) {
  const [open, setOpen] = useState(false)
  const[updateTrips, setUpdateTrips] = useState({
    country : "",
    region : "",
    category : "자연명소",
    placeName : "",
    address : "",
    description : "",
    photoUrl :""
  })

  const handleChage = (e) =>{
    const{id,value} = e.target;
    setUpdateTrips({
      ...updateTrips,
      [id]:value
    })
  }

  const handleOpen =(e) =>{
    setUpdateTrips({
      country : trip.country,
      region : trip.region,
      category : trip.category,
      placeName : trip.placeName,
      address : trip.address,
      description : trip.description,
      photoUrl :trip.photoUrl
    })
    setOpen(true)
  }
  const hadleClose =(e) => {
    setOpen(false)
  }

  const handleSave = async(url) => {
    try {
      const response = await axios.put(`${url}`,updateTrips)
      console.log(url)
      fetchTrip();
      setOpen(false)
    } catch (error) {
      console.error(error);
    }
  }

  const addressSubmit = () =>{
    new window.daum.Postcode({
      oncomplete: function(data) {
          let addr = '';
          if (data.userSelectedType === 'R') { 
              addr = data.roadAddress;
          } else {
              addr = data.jibunAddress;
          }
          setUpdateTrips(prevState => ({
            ...prevState,
            address: addr
          }))
          document.getElementById("address").value = addr;
      }
  }).open();
  }
  return (
    <>
      <MdEdit className='category-icon' onClick={() => handleOpen()}/>
      <div id='trip-modal' style={{display: open ? "block" : "none"}}>
        <h1 id='modal-title'>여행 정보 수정</h1>
          <label>
            <span>나라</span>
            <input id='country' type='text' value={updateTrips.country} onChange={handleChage} />
          </label>
          <label>
            <span>지역</span>
            <input id='region' type='text' value={updateTrips.region} onChange={handleChage} />
          </label>
          <label>
            <span>카테고리</span>
            <select id='category' onChange={handleChage} value={updateTrips.category}>
              <option>자연명소</option>
              <option>레저</option>
              <option>체험관광</option>
              <option>문화유적</option>
              <option>공연(전시)</option>
              <option>음식점(카페)</option>
            </select>
          </label>
          <label>
            <span>장소명</span>
            <input id='placeName' type='text' value={updateTrips.placeName} onChange={handleChage} />
          </label>
          <label>
            <span>주소</span>
            <input id='address' type='text' value={updateTrips.address} onChange={handleChage} className='edit-address' style={{width:'14rem'}} />
            <input value={"주소검색"} type='button' onClick={addressSubmit} style={{width:'6rem'}}/>
          </label>
          <label>
            <span>상세</span>
            <input id='description' type='text' value={updateTrips.description} onChange={handleChage} style={{margin:'0'}}/>
          </label>
          <label>
            <span>이미지 URL</span>
            <input id='photoUrl' type='text' value={updateTrips.photoUrl} onChange={handleChage} />
          </label>
          <div>
            <button className='modal-button' onClick={()=>handleSave(trip._links.self.href)}>저장</button>
            <button className='modal-button' onClick={()=>hadleClose()}>닫기</button>
          </div>
      </div>
    </>
  )
}