import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import TripModal from "./TripModal";
import { useNavigate } from "react-router-dom";
import "../css/triplist.css";

const PAGE_SIZE = 12;

const Triplist = () => {
  const [allData, setAllData] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectOption, setSelectOption] = useState("국내");
  const [totalPages, setTotalPages] = useState(1);  // totalPages를 상태로 추가
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("TRIP_DATA");
    const storedRanking = localStorage.getItem("TRIP_RANKING");
    const storedOption = localStorage.getItem("SELECT_OPTION");

    if (storedData && storedRanking && storedOption) {
      setAllData(JSON.parse(storedData));
      setRanking(JSON.parse(storedRanking));
      setSelectOption(storedOption);
      setTotalPages(Math.ceil(JSON.parse(storedData).length / PAGE_SIZE));
    } else {
      fetchDataAndRanking();
    }
  }, []);

  useEffect(() => {
    fetchDataAndRanking();
  }, [selectOption]);

  const fetchDataAndRanking = async () => {
    const rankingData = await fetchRanking();
    const travelData = await fetchData();

    handleSearch(travelData, rankingData);

    localStorage.setItem("TRIP_DATA", JSON.stringify(travelData));
    localStorage.setItem("TRIP_RANKING", JSON.stringify(rankingData));
    localStorage.setItem("SELECT_OPTION", selectOption);
  };

  const fetchRanking = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Review/Ranking");
      if (Array.isArray(response.data)) {
        setRanking(response.data);
        return response.data;
      } else {
        console.error("ranking 응답이 배열이 아닙니다.");
      }
    } catch (error) {
      console.error("랭킹 데이터 가져오기 중 오류 발생:", error);
    }
    return [];
  };

  const fetchData = async () => {
    try {
      let allFetchedData = [];
      let page = 0;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await axios.get(`http://localhost:8080/api/travelInfoes?page=${page}&size=20`);
        const data = response.data;

        const filteredData = data._embedded.travelInfoes.filter((item) =>
          selectOption === "국내"
            ? item.country === "대한민국"
            : item.country !== "대한민국"
        );

        allFetchedData = [...allFetchedData, ...filteredData];

        setTotalPages(data.page.totalPages);  // 전체 페이지 수 업데이트

        hasMorePages = data.page.number < data.page.totalPages - 1;
        page++;
      }

      return allFetchedData;
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
    return [];
  };

  const handleSearch = (data, rankingData) => {
    const updatedData = data.map((item) => {
      const rankItem = rankingData.find(
        (rank) => rank.travelInfoId === gettripId(item)
      );
      return rankItem
        ? { ...item, score: rankItem.avgScore, id: gettripId(item) }
        : { ...item, score: null, id: gettripId(item) };
    });

    setAllData(updatedData);
  };

  const deleteSubmit = async (url) => {
    try {
      await axios.delete(`${url}`);
      fetchDataAndRanking();
    } catch (error) {
      console.error("삭제 실패 :", error);
    }
  };

  const currentTrips = allData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleNextPage = () => {
    setCurrentPage((next) => Math.min(next + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const getId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf("/") + 1);
    navigate(`/tripDetail/${id}`);
  };

  const gettripId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf("/") + 1);
    return Number(id);
  };

  return (
    <div className="body">
      <div>
        <h1>여행 현황</h1>
        <select
          id="category-option"
          value={selectOption}
          onChange={(e) => setSelectOption(e.target.value)}
        >
          <option>국내</option>
          <option>해외</option>
        </select>
        <div id="category-center">
          <div className="category-list">
            {currentTrips.map((trip) => (
              <div key={trip.id} className="category-item">
                <div className="img-div">
                  <img
                    src={trip.photoUrl}
                    alt={trip.placeName}
                    onClick={() => getId(trip)}
                  />
                </div>
                <div className="category-info">
                  <p>
                    장소명: {trip.placeName}{" "}
                    <span style={{ color: "#F2CB07" }}>★</span>{" "}
                    {trip.score !== null ? trip.score : "리뷰 없음"}
                  </p>
                  <p>지역: {trip.region}</p>
                  <p>카테고리: {trip.category}</p>
                  <p>
                    <TripModal trip={trip} fetchTrip={fetchDataAndRanking} />
                    <RiDeleteBin5Line
                      className="category-icon"
                      onClick={() => deleteSubmit(trip._links.self.href)}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          id="left-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <GrCaretPrevious className="button-icon" />
        </button>
        <button
          id="right-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <GrCaretNext className="button-icon" />
        </button>
      </div>
    </div>
  );
};

export default Triplist;

