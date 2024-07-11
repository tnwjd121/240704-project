import { useEffect, useState } from "react";
import "../css/showReview.css";
import axios from "axios";
import { SERVER_URL } from "./Api";
import StarRating from "./StarRating";

export default function ShowReview({ travelInfo_ID }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    reviewlist();
  }, [travelInfo_ID]);

  const reviewlist = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/Review/travelinfo=${travelInfo_ID}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("카테고리 목록 에러 발생: ", error);
    }
  };

  return (
    <div id="review-list-body">
      {reviews.map((review, i) => (
        <div id="review-box" key={review.id}>
          {console.log(review)}
          <div id="review-box-top">
            <div id="user-name">id: {review.user.id}</div>
            <div>
              <StarRating score={review.score} />
            </div>
          </div>
          <div id="review-box-bottom">{review.contents}</div>
        </div>
      ))}
    </div>
  );
}
