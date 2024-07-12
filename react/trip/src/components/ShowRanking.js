import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./Api";
import '../css/showRanking.css'
import { useNavigate } from "react-router-dom";

export default function ShowRanking() {
  const [travelInfo, setTravelInfo] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [sortedRanking, setSortedRanking] = useState([]);
  const [sortOption, setSortOption] = useState("리뷰 수");
  const [isLoading, setIsLoading] = useState(true);
  const [filterRegion, setFilterRegion] = useState("국내"); // 기본값으로 국내 설정
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [travelInfoResponse, rankingResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/api/travel-info/all`),
          axios.get(`${SERVER_URL}/Review/Ranking`),
        ]);

        // travelInfoResponse.data가 배열인지 확인
        if (Array.isArray(travelInfoResponse.data)) {
          setTravelInfo(travelInfoResponse.data);
        } else {
          console.error("travelInfo 응답이 배열이 아닙니다.");
        }

        // rankingResponse.data가 배열인지 확인
        if (Array.isArray(rankingResponse.data)) {
          setRanking(rankingResponse.data);
        } else {
          console.error("ranking 응답이 배열이 아닙니다.");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sorted = [...ranking].sort((a, b) => {
      if (sortOption === "리뷰 수") {
        return b.reviewCount - a.reviewCount;
      } else {
        return b.avgScore - a.avgScore;
      }
    });
    setSortedRanking(sorted);
  }, [ranking, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterRegion = (e) => {
    setFilterRegion(e.target.value);
  };

  const getTravelInfoById = (id) => {
    return travelInfo.find((travelInfo) => travelInfo.id === id) || {};
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 국가 필터링된 리스트
  const filteredRanking = sortedRanking.filter((item) => {
    const travelInfoItem = getTravelInfoById(item.travelInfoId);

    // travelInfoItem의 국가가 "국내"인지 확인
    if (filterRegion === "국내") {
      return travelInfoItem.country === "대한민국";
    } else {
      // "해외"인 경우
      return travelInfoItem.country !== "대한민국";
    }
  });

  const getId = (id) => {
    navigate(`/tripDetail/${id}`);
  };

  return (
    <div className="body">
      <h1>여행지 랭킹</h1>
      <div id="rank-select">
        <label>국내/해외 : </label>
        <select value={filterRegion} onChange={handleFilterRegion} style={{marginRight:'1rem'}}>
          <option value="국내">국내</option>
          <option value="해외">해외</option>
        </select>
        <label>랭킹 : </label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="리뷰 수">리뷰 수</option>
          <option value="평점 순">평점 순</option>
        </select>
      </div>
      <div id="rank-body">
        {filteredRanking.map((item) => {
          const travelInfoItem = getTravelInfoById(item.travelInfoId);
          return (
            <div key={item.travelInfoId} className="rankBox">
              <div className="rank-img">
                <img src={travelInfoItem.photoUrl} alt="" onClick={()=>getId(travelInfoItem.id)}/>
              </div>
              <div className="trip-rank-text">
                <div className="rank-text-top">
                  <div>
                    {travelInfoItem.placeName}
                  </div>
                  <div>
                    {sortOption === "리뷰 수"
                    ? "리뷰 수 : " + item.reviewCount
                    : "평점 : " + item.avgScore}
                  </div>
                </div>
                <div className="rank-text-end">
                  <div> 지역:{" "} {travelInfoItem.region}({travelInfoItem.country})
                  </div>
                  <div>카테고리: {travelInfoItem.category}</div>
                  <div>주소 : {travelInfoItem.address}</div>
                </div>
              </div>
              <div className="category-info"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
