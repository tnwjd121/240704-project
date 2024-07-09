import { useEffect, useState } from "react";

export default function WriteReview({ travelInfo_ID, user_ID }) {
  const [review, setReview] = useState({});
  const [score, setScore] = useState({});
  const [contents, setContents] = useState({});

  useEffect(() => {
    const api = `http://localhost:8080/Review/travelinfo=${travelInfo_ID}&userId=${user_ID}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => setReview(data));
  }, []);

  return (
    <div className="reviewbox" key={it.id}>
      <div>여행지 : {travelInfo_ID}</div>
      <div>작성자 : {user_ID}</div>
      <div>
        점수 :
        <input
          type="int"
          min={0}
          max={5}
          onChange={(e) => setScore(e.target.value)}
        ></input>
      </div>
      <div>
        내용 :
        <textarea
          type="text"
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
