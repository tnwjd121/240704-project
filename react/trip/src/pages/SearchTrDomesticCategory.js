import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/SearchTrCategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../components/Api";

const SearchTrDomesticCategory = () => {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/travel-info/all"
        );
        const DomesticData = response.data.filter(
          (item) => item.country === "대한민국"
        );
        setAllData(DomesticData);
        setResults(DomesticData);
      } catch (error) {
        console.error("데이터 가져오기 중 오류 발생:", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/Review/Ranking`);
        if (Array.isArray(response.data)) {
          setRanking(response.data);
        } else {
          console.error("ranking 응답이 배열이 아닙니다.");
        }
      } catch (error) {
        console.error("랭킹 데이터 가져오기 중 오류 발생:", error);
      }
    };

    fetchData();
    fetchData2();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [allData, ranking, category, query]);

  const handleSearch = () => {
    // 별점 데이터를 업데이트
    const updatedData = allData.map((item) => {
      const rankItem = ranking.find((rank) => rank.travelInfoId === item.id);
      return rankItem ? { ...item, score: rankItem.avgScore } : item;
    });

    const filteredResults = updatedData.filter(
      (item) =>
        (category === "전체" || item.category === category) &&
        item.placeName.includes(query)
    );

    setResults(filteredResults);
  };

  return (
    <div className="body">
      <div className="search-bar-container">
        <div className="search-bar">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
        {results.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>장소명</th>
                <th>카테고리</th>
                <th>국가</th>
                <th>지역</th>
                <th>별점</th>
                <th>길찾기</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.placeName}</td>
                  <td>{result.category}</td>
                  <td>{result.country}</td>
                  <td>{result.region}</td>
                  <td>{result.score>0?result.score:"리뷰 없음"}</td>
                  <td>
                    <Link to={`/way-detail/${result.id}`}>
                      <button className="path">
                        길찾기 <FontAwesomeIcon icon={faLocationDot} />
                      </button>
                    </Link>
                  </td>
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
};

export default SearchTrDomesticCategory;
