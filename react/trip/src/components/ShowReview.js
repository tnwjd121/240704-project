import { startTransition, useEffect, useState } from "react";
import '../css/showReview.css'
import axios from "axios";
import { SERVER_URL } from "./Api";
import StarRating from "./StarRating";

export default function ShowReview({travelInfo_ID}) {
  const [reviews, setReviews] = useState([]);

  useEffect(()=>{
    reviewlist()
  },[])

  const reviewlist = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/reviews`)
      const reviewData = response.data._embedded.reviews
      setReviews(reviewData)
      // 현재 외래키 부분 등록이 안되어서 값이 없음
      // 정상적으로 변경이 되면 아래 코드로 변경 예정
      // const fiterReview = reviewData.filter(review => review.travel_info_id === travelInfo_ID)
      // setReviews(fiterReview)
    } catch (error) {
      console.error("카테고리 목록 에러 발생: " , error);
    }
  }


  return (
    <div id="review-list-body">
      {reviews.map((review, i)=>(
      <div id="review-box" key={review.id}>
        <div id="review-box-top">
          <div id="user-name">id:{review.user_id}</div>
          <div><StarRating score={review.score}/></div>
        </div>
        <div id="review-box-bottom">{review.contents}</div>
      </div>
      ))}
    </div>
  );
}
