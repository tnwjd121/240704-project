import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import '../css/TrInRheader.css';
import axios from 'axios';


export default function TrInRegistration() {
  const [formData, setFormData] = useState({
    country: '',
    region: '',
    category: '자연명소',
    placeName: '',
    address: '',
    description: '',
    photoUrl: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    if (!allFieldsFilled) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/travel-info/add', formData);
      console.log(response.data);
      alert('등록이 완료되었습니다!');
      navigate('/'); 
    } catch (error) {
      console.error('에러', error);
      alert(`등록 중 오류가 발생했습니다: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className='body'>
      <h1>여행 정보 등록</h1>
      <div className="registration-form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <label>
            나라
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </label>
          <label>
            지역
            <input type="text" name="region" value={formData.region} onChange={handleChange} />
          </label>
          <label>
            카테고리
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="자연명소">자연명소</option>
              <option value="레저">레저</option>
              <option value="체험관광">체험관광</option>
              <option value="문화유적">문화유적</option>
              <option value="공연(전시)">공연(전시)</option>
              <option value="음식점(카페)">음식점(카페)</option>
            </select>
          </label>
          <label>
            장소명
            <input type="text" name="placeName" value={formData.placeName} onChange={handleChange} />
          </label>
          <label>
            주소
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>
            상세
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            이미지 URL
            <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleChange} />
          </label>
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  );
}