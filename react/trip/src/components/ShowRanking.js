import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../components/Api";
import axios from "axios";
import "../css/triplist.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import TripModal from "./TripModal";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 12;

export default function Triplist() {
  // 목록(수정, 삭제)
  // 대한민국 == 국내, 대한민국 제외 == 해외
  // 이미지와 지역, 카테고리, 장소명
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectOption, setSelectOption] = useState("국내");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrip();
  }, [selectOption]);

  const fetchTrip = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/travelInfoes`);
      const tripData = response.data._embedded.travelInfoes;
      const fiteredTrip = tripData.filter((trip) => {
        if (selectOption === "국내") {
          return trip.country === "대한민국";
        } else {
          return trip.country !== "대한민국";
        }
      });
      setTrips(fiteredTrip);
    } catch (error) {
      console.error("카테고리 목록 에러 발생: ", error);
    }
  };

  const deleteSubmit = async (url) => {
    try {
      const response = await axios.delete(`${url}`);
      fetchTrip();
    } catch (error) {
      console.error("삭제 실패 :", error);
    }
  };
  const totalPages = Math.ceil(trips.length / PAGE_SIZE);
  const currentTrips = trips.slice(
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

  return (
    <div className="body">
      <div>
        <h1>카테고리 목록</h1>
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
                  ></img>
                </div>
                <div className="category-info">
                  <p>지역: {trip.region}</p>
                  <p>카테고리: {trip.category}</p>
                  <p>장소명: {trip.placeName}</p>
                  <p>
                    <TripModal trip={trip} fetchTrip={fetchTrip} />
                    <RiDeleteBin5Line
                      className="category-icon"
                      onClick={() => deleteSubmit(trip._links.self.href)}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div></div>
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
}
