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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/Review/Ranking"
        );
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
    fetchRanking();
  }, [selectOption]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/travelInfoes"
      );
      const filteredData = response.data._embedded.travelInfoes.filter((item) =>
        selectOption === "국내"
          ? item.country === "대한민국"
          : item.country !== "대한민국"
      );
      setAllData(filteredData);
      handleSearch(filteredData);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  const handleSearch = (data) => {
    const updatedData = data.map((item) => {
      const rankItem = ranking.find(
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
      fetchData();
    } catch (error) {
      console.error("삭제 실패 :", error);
    }
  };

  const totalPages = Math.ceil(allData.length / PAGE_SIZE);
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
                    <TripModal trip={trip} fetchTrip={fetchData} />
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
