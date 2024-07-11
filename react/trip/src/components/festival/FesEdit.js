import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import '../../css/FesEdit.css'
import axios from 'axios';

export default function FesEdit({festival, fetchFestivals}) {
  const [open, setOpen] = useState(false)
  const[updateFes, setUpdateFes] = useState({
    country: '',
    countryName: '',
    region: '',
    fesName: '',
    price:'',
    address: '',
    host:'',
    phoneNumber:'',
    startDate: '',
    endDate: '',
    detail: '',
    imageUrl: ''
  })

  const handleChange = (e) =>{
    const{id,value} = e.target;
    setUpdateFes({
      ...updateFes,
      [id]:value
    })
  }

  const handleOpen = (e) =>{
    setUpdateFes({
      country : festival.country,
      countryName : festival.countryName,
      region : festival.region,
      fesName : festival.fesName,
      price : festival.price,
      address : festival.address,
      host : festival.host,
      phoneNumber : festival.phoneNumber,
      startDate : festival.startDate,
      endDate : festival.endDate,
      detail : festival.detail,
      imageUrl :festival.imageUrl
    })
    setOpen(true)
  }

  const hadleClose =(e) => {
    setOpen(false)
  }

  const handleSave = async(url) => {
    if(updateFes.startDate>updateFes.endDate){
      alert("축제 시작 날짜와 종료날짜를 다시 확인해주세요")
    }else{
      try {
        const response = await axios.put(`${url}`,updateFes)
        fetchFestivals();
        setOpen(false)
      } catch (error) {
        console.error(error);
      }
    }
  }

  const kRegion=[
    {value:"서울", label:"서울"},
    {value:"인천", label:"인천"},
    {value:"대전", label:"대전"},
    {value:"대구", label:"대구"},
    {value:"광주", label:"광주"},
    {value:"부산", label:"부산"},
    {value:"울산", label:"울산"},
    {value:"세종시", label:"세종시"},
    {value:"경기도", label:"경기도"},
    {value:"강원도", label:"강원도"},
    {value:"충청북도", label:"충청북도"},
    {value:"충청남도", label:"충청남도"},
    {value:"경상북도", label:"경상북도"},
    {value:"경상남도", label:"경상남도"},
    {value:"전북특별자치도", label:"전북특별자치도"},
    {value:"전라남도", label:"전라남도"},
    {value:"제주도", label:"제주도"}
  ]
  
  return (
    <>
      <MdEdit className='category-icon' onClick={() => handleOpen()}/>
      <div id='trip-modal' style={{display: open ? "block" : "none"}}>
        <h1 id='modal-title'>여행 정보 수정</h1>
          <label>
            <span>축제 이름</span>
            <input type='text' id="fesName" value={updateFes.fesName} onChange={handleChange} />
          </label>
          <label>
            <span>국내/해외</span>
            <select id="country" value={updateFes.country} onChange={handleChange}>
              <option>국내</option>
              <option>해외</option>
            </select>
          </label>
          {(updateFes.country==="국내") && (
            <>
              <label>
                <span>국가명</span>
                <input type="text" name="countryName" value={updateFes.countryName="대한민국"} onChange={handleChange} readOnly/>
              </label>
              <label>
                <span>지역</span>
                <select type="text" id="region" value={updateFes.region} onChange={handleChange}>
                {kRegion.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))} 
                </select>
              </label>
            </>
          )}
          {updateFes.country==="해외" && (
            <>            
              <label>
                <span>국가명</span>
                <input type="text" id="countryName" value={updateFes.countryName} onChange={handleChange} />
              </label>
              <label>
                <span>지역</span>
                <input type="text" name="region" value={updateFes.region} onChange={handleChange} />
              </label>
            </>
          )}
          <label>
            <span>입장료</span>
            <input type="text" id="price" value={updateFes.price} onChange={handleChange} />
          </label>
          <label>
            <span>주소</span>
            <input type='text' id='address' value={updateFes.address} onChange={handleChange} />
          </label>
          <label>
            <span>주최</span>
            <input type='text' id='host' value={updateFes.host} onChange={handleChange} />
          </label>
          <label>
            <span>전화번호</span>
            <input type="text" id="phoneNumber" value={updateFes.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            <span>시작일</span>
            <input type="date" id="startDate" value={updateFes.startDate} onChange={handleChange} />
          </label>
          <label>
            <span>종료일</span>
            <input type="date" id="endDate" value={updateFes.endDate} onChange={handleChange} />
          </label>
          <label>
            <span>설명</span>
            <input type='text' id='detail' value={updateFes.description} onChange={handleChange} />
          </label>
          <label>
            <span>이미지 URL</span>
            <input type='text' id='imageUrl' value={updateFes.imageUrl} onChange={handleChange} />
          </label>
          <div>
            <button className='modal-button' onClick={()=>handleSave(festival._links.self.href)}>저장</button>
            <button className='modal-button' onClick={()=>hadleClose()}>닫기</button>
          </div>
      </div>
    </>
  )
}