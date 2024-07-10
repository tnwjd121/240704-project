import { useEffect, useState } from "react";
import '../css/writeReview.css'
import StarRating from "./StarRating";
import axios from "axios";
import { SERVER_URL } from "./Api";
import '../css/writeReview.css'
import ShowReview from "./ShowReview";

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

    const reviewdb = await axios.get(`${SERVER_URL}/Review/travelinfo=${travelInfo_ID}`)
    const reviews =reviewdb.data
    const idCheck = reviews.filter(review => review.user.id === user_ID)
    if(idCheck.length>0){
      alert("이미 등록된 리뷰가 있습니다.")
      return
    }

    if(user_ID==undefined){
      alert("로그인 후 리뷰 등록 부탁드립니다.")
      return
    }

    if(reviewData.score==''){
      reviewData.score = 0
    }

    try {
      const response = await axios.post(`${SERVER_URL}/Review/Write`, reviewData)
      
      window.location.reload();
    } catch (error) {
      console.error("리뷰 등록 에러 발생: ", error);
    }
  }

  return (
    <>
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
      <ShowReview travelInfo_ID={travelInfo_ID}/>
    </>
  );
}
