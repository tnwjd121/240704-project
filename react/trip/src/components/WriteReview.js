import { useEffect, useState } from "react";

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

  return (
    <div className="reviewbox" key={review.id}>
      <form onSubmit={reviewUpload}>
        <div>여행지 : {review.travelInfo_ID}</div>
        <div>작성자 : {review.user_ID}</div>
        <div>
          점수 :
          <input
            type="number"
            min={0}
            max={5}
            onChange={(e) => setScore(e.target.value)}
            value={score}
          ></input>
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
