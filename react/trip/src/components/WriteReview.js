import { useEffect, useState } from "react";
import '../css/writeReview.css'
import StarRating from "./StarRating";
import axios from "axios";
import { SERVER_URL } from "./Api";
import '../css/writeReview.css'

<<<<<<< HEAD
export default function WriteReview({ travelInfo_ID, user_ID }) {
  const [reviewData, setReviewData] = useState({
    travel_info_id : travelInfo_ID,
    user_id : user_ID,
    score : "",
    contents :""
  })
  const handleChange = (event) => {
    const {name, value} = event.target;
    setReviewData((prev) =>({
      ...prev,
      [name]: value
    }))
  }

  const reviewUpload = async (e) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/reviews`, reviewData)

      console.log(reviewData)

    } catch (error) {
      console.error("리뷰 등록 에러 발생: ", error);
    }
  }
=======
export default function WriteReview({ travel_Info_ID, user_ID }) {
  const [review, setReview] = useState({});
  const [score, setScore] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const api = `http://localhost:8080/Review/travelinfo=${travel_Info_ID}&userId=${user_ID}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setReview(data);
        setScore(data.score || "");
        setContents(data.contents || "");
      });
  }, [travel_Info_ID, user_ID]);

  const reviewUpload = (event) => {
    event.preventDefault();
    const api = `http://localhost:8080/Review/Write`;
    const writeReviewBody = {
      travel_Info_ID: travel_Info_ID,
      user_ID: user_ID,
      score: score,
      contents: contents,
    };
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(writeReviewBody),
    })
      .then((response) => response.json())
      .then((data) => setReview(data));
  };
>>>>>>> origin/asb

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
