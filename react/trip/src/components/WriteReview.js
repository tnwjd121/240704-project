import { useEffect, useState } from "react";
import '../css/writeReview.css'
import StarRating from "./StarRating";
import axios from "axios";
import { SERVER_URL } from "./Api";
import '../css/writeReview.css'

export default function WriteReview({ travelInfo_ID, user_ID }) {
  const [reviewData, setReviewData] = useState({
    travel_info_id : travelInfo_ID,
    user_id : user_ID,
    score : "",
    contents :""
  })

  useEffect(() => {
    setReviewData(prev => ({
      ...prev,
    }));
  }, [travelInfo_ID, user_ID]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setReviewData((prev) =>({
      ...prev,
      [name]: value
    }))
  }

  const reviewUpload = async (e) => {
    try {
      const response = await axios.post(`${SERVER_URL}/Review/Write`, reviewData)
      
    } catch (error) {
      console.error("리뷰 등록 에러 발생: ", error);
    }
  }

  return (
    <div className="reviewbox">
      <div id="review-top">
        <div id="user-name">id: {user_ID}</div>
        <div>
          <StarRating 
          score={reviewData.score} 
          onScoreChange={(value)=> handleChange({ target : {name: 'score', value}})}/>
        </div>
      </div>
        <div>
          <textarea
            id="review-text"
            name = "contents"
            onChange={handleChange}
            value={reviewData.contents}
          ></textarea>
        </div>
        <button id="review-button" onClick={reviewUpload}>리뷰 작성</button>
    </div>
  );
}
