import React, { useState } from 'react';
import '../../css/TrInRheader.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function FesReg() {
  const [festivals,setFestivals] = useState([])
  const [festival, setFestival] = useState({
    country: '국내',
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
  });

  const handleChange = (event) => {
    setFestival({...festival,[event.target.name]:event.target.value})
  };

  const fetchFestivals=()=>{
    fetch("http://localhost:8080/api/festivals")
    .then(res=>res.json())
    .then(data=>
      setFestivals(data._embedded.festivals)
    )
    .catch(err=>console.log(err))
  }

  const navigate = useNavigate();

  const handleSave=async(event)=>{
    event.preventDefault();

    if(festival.startDate>festival.endDate){
      alert("축제 시작 날짜와 종료날짜를 다시 확인해주세요")
    }else if(festival.region==="" && festival.countryName===""){
      alert("지역명 혹은 국가명을 입력해주세요")
    }else{
      try {
        const response = await axios.post('http://localhost:8080/api/festivals', festival);
        console.log(response.data);
        alert('등록이 완료되었습니다!');
        navigate('/')
      } catch (error) {
        console.error('에러', error);
        alert(`등록 중 오류가 발생했습니다: ${error.response ? error.response.data : error.message}`);
      }
    }
  };

  const kRegion=[
    {label:""},
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
    <div>
      <h1>축제 등록</h1>
      <div className="registration-form-container">
        <form className="registration-form">
          <label>
            축제이름
            <input type='text' name="fesName" value={festival.fesName} onChange={handleChange} />
          </label>
          <label>
            나라
            <select name="country" value={festival.country} onChange={handleChange}>
              <option>국내</option>
              <option>해외</option>
            </select>
          </label>
          {(festival.country==="국내") && (
            <label>
              지역
              <select type="text" name="region" value={festival.region} onChange={handleChange}>
              {kRegion.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} 
              </select>
            </label>
          )}
          {festival.country==="해외" && (
            <label>
              국가명
              <input type="text" name="countryName" value={festival.countryName} onChange={handleChange} />
            </label>
          )}
          <label>
            입장료
            <input type="text" name="price" value={festival.price} onChange={handleChange} />
          </label>
          <label>
            주소
            <input type="text" name="address" value={festival.address} onChange={handleChange} />
          </label>
          <label>
            주최
            <input type="text" name="host" value={festival.host} onChange={handleChange} />
          </label>
          <label>
            전화번호
            <input type="text" name="phoneNumber" value={festival.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            시작일
            <input type="date" name="startDate" value={festival.startDate} onChange={handleChange} />
          </label>
          <label>
            종료일
            <input type="date" name="endDate" value={festival.endDate} onChange={handleChange} />
          </label>
          <label>
            설명
            <textarea name="detail" value={festival.description} onChange={handleChange} />
          </label>
          <label>
            사진 URL
            <input type="url" name="imageUrl" value={festival.imageUrl} onChange={handleChange} />
          </label>
          <button type="submit" onClick={handleSave}>등록</button>
        </form>
      </div>
    </div>
  );
}

export default FesReg;