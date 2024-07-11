import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "./Api";
import "../css/RankingSlide.css";

const RankingSlide = () => {
  const [filterRegion, setFilterRegion] = useState("국내");
  const [travelInfo, setTravelInfo] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedRanking, setSortedRanking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [travelInfoResponse, rankingResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/api/travel-info/all`),
          axios.get(`${SERVER_URL}/Review/Ranking`),
        ]);

        if (Array.isArray(travelInfoResponse.data)) {
          setTravelInfo(travelInfoResponse.data);
        } else {
          console.error("travelInfo 응답이 배열이 아닙니다.");
        }

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
      return b.reviewCount * b.avgScore - a.reviewCount * a.avgScore;
    });
    setSortedRanking(sorted);
  }, [ranking]);

  const getTravelInfoById = (id) => {
    return travelInfo.find((travelInfo) => travelInfo.id === id) || {};
  };

  const filteredRanking = sortedRanking.filter((item) => {
    const travelInfoItem = getTravelInfoById(item.travelInfoId);
    return filterRegion === "국내"
      ? travelInfoItem.country === "대한민국"
      : travelInfoItem.country !== "대한민국";
  });

  const ShowImgArr = filteredRanking.slice(0, 3).map((item) => {
    const travelInfoItem = getTravelInfoById(item.travelInfoId);
    return travelInfoItem;
  });

  const BG_NUM = ShowImgArr.length;
  const beforeSlide = ShowImgArr[BG_NUM - 1];
  const afterSlide = ShowImgArr[0];
  const slideArr = [beforeSlide, ...ShowImgArr, afterSlide];

  const SLIDE_NUM = slideArr.length;
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideInterval, setSlideInterval] = useState(6000);

  const slideRef = useRef(null);

  const useInterval = (callback, interval) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (interval !== null) {
        const id = setInterval(tick, interval);
        return () => clearInterval(id);
      }
    }, [interval]);
  };

  useInterval(
    () => setSlideIndex((prev) => (prev + 1) % SLIDE_NUM),
    slideInterval
  );

  const InfiniteSlideHandler = (flytoIndex) => {
    setTimeout(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = "";
      }
      setSlideIndex(flytoIndex);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "all 500ms ease-in-out";
        }
      }, 100);
    }, 500);
  };

  const handleFilterRegion = (e) => {
    setFilterRegion(e.target.value);
  };

  if (slideIndex === SLIDE_NUM - 1) {
    InfiniteSlideHandler(1);
  }

  if (slideIndex === 0) {
    InfiniteSlideHandler(SLIDE_NUM - 2);
  }

  const intervalHandler = () => {
    if (slideIndex === SLIDE_NUM - 1) {
      setSlideInterval(500);
    } else {
      setSlideInterval(6000);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="RankingSlide">
      <div id="slide-div">
        <label>
          <span>국내/해외 : </span>
          <select value={filterRegion} onChange={handleFilterRegion}>
            <option value="국내">국내</option>
            <option value="해외">해외</option>
          </select>
        </label>
      </div>
      <div
        ref={slideRef}
        className="ImgContainer"
        style={{
          width: `${100 * SLIDE_NUM}vw`,
          transition: "all 500ms ease-in-out",
          transform: `translateX(-${(100 / SLIDE_NUM) * slideIndex}%)`,
          display: "flex",
        }}
      >
        {slideArr.map((item, index) => (
          <div key={index} className="ImgBox" style={{ minWidth: "100vw" }}>
            {item && item.photoUrl ? (
              <a href={`http://localhost:3000/tripDetail/${item.id}`}>
                <img
                  src={item.photoUrl}
                  alt={`Slide ${index}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
            ) : (
              <div>이미지 없음</div>
            )}
          </div>
        ))}
      </div>
      <button
        className="SlideBtn Left"
        onMouseEnter={intervalHandler}
        onMouseLeave={intervalHandler}
        onClick={() => setSlideIndex((slideIndex + SLIDE_NUM - 1) % SLIDE_NUM)}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="4x" />
      </button>
      <button
        className="SlideBtn Right"
        onMouseEnter={intervalHandler}
        onMouseLeave={intervalHandler}
        onClick={() => setSlideIndex((slideIndex + 1) % SLIDE_NUM)}
      >
        <FontAwesomeIcon icon={faChevronRight} size="4x" />
      </button>
    </div>
  );
};

export default RankingSlide;
