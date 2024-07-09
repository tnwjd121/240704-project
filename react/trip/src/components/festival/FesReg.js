import React, { useState } from 'react';
import '../../css/TrInRheader.css';


function FesReg() {
  const [festivals,setFestivals] = useState([])
  const [festival, setFestival] = useState({
    country: '',
    region: '',
    fesName: '',
    address: '',
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

  const addFes=(festival)=>{
    if(festival.startDate>=festival.endDate){
      alert("축제 시작 날짜와 종료날짜를 다시 확인해주세요")
    }else{
      fetch(
        "http://localhost:8080/api/festivals",
        {
          method:"POST",
          headers:{"content-Type":"application/json"},
          body:JSON.stringify(festival)
        }
      )
      .then(
        response=>{
          if(response.ok){
            fetchFestivals();
          }
        }
      )
    }
  }

  const handleSave=()=>{
    addFes(festival);
  }

  return (
    <div className='body'>
      <h1>축제 등록</h1>
      <div className="registration-form-container">
        <form className="registration-form">
          <label>
            축제이름
            <input type='text' name="fesName" value={festival.fesName} onChange={handleChange} />
          </label>
          <label>
            나라
            <input type="text" name="country" value={festival.country} onChange={handleChange} />
          </label>
          <label>
            지역
            <input type="text" name="region" value={festival.region} onChange={handleChange} />
          </label>
          <label>
            주소
            <input type="text" name="address" value={festival.address} onChange={handleChange} />
          </label>
          <label>
            시작일
            <input type="date" name="startDate" value={festival.startDate} onChange={handleChange} />
          </label>
          <label>
            종료일 <span> </span>
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