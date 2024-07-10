import { useEffect, useState } from "react";
import '../css/writeReview.css'
import StarRating from "./StarRating";

export default function WriteReview({ travelInfo_ID, user_ID }) {
  const [review, setReview] = useState({});
  const [score, setScore] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const api = `http://localhost:8080/Review/travelinfo=${travelInfo_ID}&userId=${user_ID}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setReview(data);
        setScore(data.score || "");
        setContents(data.contents || "");
      });
  }, [travelInfo_ID, user_ID]);

  const reviewUpload = (event) => {
    event.preventDefault();
    const api = `http://localhost:8080/Review/Write`;
    const writeReviewBody = {
      travelInfo_ID: travelInfo_ID,
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

  const handleScoreChange = (value) => {
    setScore(value); // 별점 값 변경
  };

  return (
    <div className="reviewbox" key={review.id}>
      <form onSubmit={reviewUpload}>
        <div>작성자 : {review.user_ID}</div>
        <div>
          점수 :
          <StarRating score={score} onScoreChange={handleScoreChange}/>
        </div>
        <div>
          내용 :
          <textarea
            onChange={(e) => setContents(e.target.value)}
            value={contents}
          ></textarea>
        </div>
        <button type="submit">리뷰 작성</button>
      </form>
    </div>
  );
}
