import { useEffect, useState } from "react";

export default function ShowReview({ id }) {
  const [api, setApi] = useState("");
  const [review, setReview] = useState([]);

  useEffect(() => {
    if (!isNaN(id)) {
      setApi(`http://localhost:8080/Review/userId=${id}`);
    } else {
      setApi(`http://localhost:8080/Review/travelinfo=${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (api !== "") {
      fetch(api)
        .then((response) => response.json())
        .then((data) => setReview(data));
    }
  }, [api]);

  return (
    <div>
      {review.map((it) => (
        <div className="reviewbox" key={it.id}>
          <div>여행지 : {it.travelInfo_ID}</div>
          <div>작성자 : {it.user_ID}</div>
          <div>점수 : {it.score}</div>
          <div>내용 : {it.contents}</div>
        </div>
      ))}
    </div>
  );
}
