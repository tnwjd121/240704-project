import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SearchTrCategory.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchTrDomesticCategory = () => {
  const [category, setCategory] = useState('전체');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // 모든 대한민국 데이터를 가져옴
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/travel-info/all');
        const DomesticData = response.data.filter(item => item.country === '대한민국');
        setAllData(DomesticData);
        setResults(DomesticData);
      } catch (error) {
        console.error('데이터 가져오기 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredResults = allData.filter(item =>
      (category === '전체' || item.category === category) && item.placeName.includes(query)
    );
    setResults(filteredResults);
  };

  return (
    <div className='body'>
      <div className="search-bar-container">
        <div className="search-bar">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="전체">전체</option>
            <option value="자연명소">자연명소</option>
            <option value="레저">레저</option>
            <option value="체험관광">체험관광</option>
            <option value="문화유적">문화유적</option>
            <option value="공연(전시)">공연(전시)</option>
            <option value="음식점(카페)">음식점(카페)</option>
          </select>
          <input 
            type="text" 
            placeholder="가고 싶은 장소를 검색하세요." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="search-results">
        {results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>나라</th>
                <th>지역</th>
                <th>장소 이름</th>
                <th>별점</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.id}>
                  <td>{result.category}</td>
                  <td>{result.country}</td>
                  <td>{result.region}</td>
                  <td>{result.placeName}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SearchTrDomesticCategory;