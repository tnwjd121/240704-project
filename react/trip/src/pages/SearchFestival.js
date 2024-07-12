import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchTrCategory.css";
import { useNavigate } from "react-router-dom";


export default function SearchFestival() {
  const [festivals, setFestivals] = useState([]);
  const [selectOption, setSelectOption] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  // 축제 데이터 불러오기
  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/festivals`);
      const festivalData = response.data._embedded.festivals;
      setFestivals(festivalData);
      setSearchResults(festivalData);
    } catch (error) {
      console.error("축제 목록 불러오기 에러 발생: ", error);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  // 검색 버튼 클릭 시
  const searchButtonClick = () => {
    if (searchInput.trim() === '') {
      // 검색어가 없는 경우 전체 목록 보여주기
      setSearchResults(festivals);
    } else {
      // 검색어가 있는 경우 해당하는 축제 필터링
      const searchData = festivals.filter(fes => {
        return fes.fesName.includes(searchInput);
      });
      setSearchResults(searchData);
    }
  };

  // 선택 옵션 변경 시
  const handleSelectChange = (e) => {
    const option = e.target.value;
    setSelectOption(option);
    if (option === '전체') {
      // 전체 선택 시 전체 목록 보여주기
      setSearchResults(festivals);
    } else {
      // 국내 또는 해외 선택 시 해당하는 축제 필터링
      const filteredFestivals = festivals.filter(fes => {
        return option === '국내' ? fes.country === '국내' : fes.country !== '국내';
      });
      setSearchResults(filteredFestivals);
    }
  };

  const getId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf("/") + 1);
    navigate(`/KFesDetail/${id}`);
  };

  return (
    <div className='body'>
      <div className="search-bar-container">
        <div className="search-bar">
          <select
            onChange={handleSelectChange}
            value={selectOption}
          >
            <option value="전체">전체</option>
            <option value="국내">국내</option>
            <option value="해외">해외</option>
          </select>
          <input
            type="text"
            placeholder="가고 싶은 축제를 검색하세요."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={searchButtonClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="search-results">
        {searchResults.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>축제명</th>
                <th>국가</th>
                <th>지역</th>
                <th>입장료</th>
                <th>진행 기간</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((fes) => (
                <tr key={fes._links.self.href} onClick={() => getId(fes)} >
                  <td>{fes.fesName}</td>
                  <td>{fes.countryName}</td>
                  <td>{fes.region}</td>
                  <td>{fes.price}</td>
                  <td>{fes.startDate} ~ {fes.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">검색결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
