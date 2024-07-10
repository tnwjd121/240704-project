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
        .then((data) => setReview(data))
        .catch((error) => console.error("리뷰 에러: ", error));
    }
  }, [api]);

  return (
    <div>
      {review.map((it) => (
        <div className="reviewbox" key={it.id}>
          <p>여행지 : {it.travelInfo_ID}</p>
          <p>작성자 : {it.user_ID}</p>
          <p>점수 : {it.score}</p>
          <p>내용 : {it.contents}</p>
        </div>
      ))}
    </div>
  );
}
