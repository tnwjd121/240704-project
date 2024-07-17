import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import '../css/mainTrip.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const PAGE_SIZE = 5;
const RANDOM_ITEM_COUNT = 10;

export default function MainTripList() {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allFetchedData = [];
        let page = 0;
        let hasMorePages = true;

        while (hasMorePages) {
          const response = await axios.get(`http://localhost:8080/api/travelInfoes?page=${page}&size=20`);
          const data = response.data;

          // data._embedded.travelInfoes를 사용하여 배열을 가져오기
          if (data._embedded && Array.isArray(data._embedded.travelInfoes)) {
            allFetchedData = [...allFetchedData, ...data._embedded.travelInfoes];
          } else {
            hasMorePages = false; // 만약 travelInfoes가 없다면 더 이상 페이지가 없다고 가정
          }

          setTotalPages(data.page.totalPages); // 데이터의 페이지 정보를 업데이트

          hasMorePages = data.page.number < data.page.totalPages - 1;
          page++;
        }
        const randomItems = getRandomItems(allFetchedData, RANDOM_ITEM_COUNT);
        setAllData(randomItems);
      } catch (error) {
        console.error("데이터 가져오기 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  
  const TotalPages = Math.ceil(allData.length / PAGE_SIZE);

  const currentTrips = allData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  ); 



  const handleNextPage = () => {
    setCurrentPage((next) => Math.min(next + 1, TotalPages));
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
    <div>
      <h1>추천 여행지</h1>
      <div id='main-trip'>
        <button
          id="left-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
      {currentTrips.map((trip) => (
              <div key={trip.id} id='main-trip-item'>
                <div className="main-info-top">
                  <p>{trip.placeName}</p>
                </div>
                <div className="main-img">
                  <img
                    src={trip.photoUrl}
                    alt={trip.placeName}
                    onClick={() => getId(trip)}
                  />
                </div>
                <div className="main-info-bottom">
                  <p>{trip.region}</p>
                </div>
              </div>
            ))}
        <button
          id="right-button"
          onClick={handleNextPage}
          disabled={currentPage === TotalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}
