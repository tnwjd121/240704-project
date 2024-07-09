import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Join.css";
import LoginFail from "./LoginFail";

export default function JoinBox() {
  const [joinId, setJoinId] = useState("");
  const [joinCheck, setJoinCheck] = useState("중복 확인이 필요합니다");
  const [joinPw, setJoinPw] = useState("");
  const [joinPw2, setJoinPw2] = useState("");
  const [joinEmail, setJoinEmail] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinGender, setJoinGender] = useState("남자");
  const [joinAge, setJoinAge] = useState(0);
  const [canJoin, setCanJoin] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const canJoinChecke = () => {
    const api = `http://localhost:8080/User/Check/id=${joinId}`;
    if (joinId.length > 4) {
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data === false) {
            setJoinCheck("아이디 사용 가능");
          } else {
            setJoinCheck("중복 확인이 필요합니다");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setJoinCheck("중복 확인 실패");
        });
    } else {
      setJoinCheck("아이디는 4자리 이상");
    }
  };

  const toggleGender = () => {
    setJoinGender((prevGender) => (prevGender === "남자" ? "여자" : "남자"));
  };

  const finalCheck = () => {
    if (joinCheck === "아이디 사용 가능" && joinPw === joinPw2) {
      setCanJoin(true);
    } else {
      setCanJoin(false);
    }
  };

  const joinNewUser = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    finalCheck();
    const api = "http://localhost:8080/User/join";
    const joinUserBody = {
      ID: joinId,
      Password: joinPw,
      Email: joinEmail,
      name: joinName,
      gender: joinGender === "남자" ? true : false,
      age: joinAge,
    };
    if (canJoin) {
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(joinUserBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User joined:", data);
          setPopupMessage("가입 성공");
          setShowPopup(true);
          setTimeout(() => navigate("/login"), 3000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (joinCheck !== "아이디 사용 가능") {
      setPopupMessage("아이디 중복 확인이 필요합니다.");
      setShowPopup(true);
    } else if (joinPw === joinPw2) {
      setPopupMessage("비밀번호가 일치하지 않습니다.");
      setShowPopup(true);
    }
  };

  return (
    <div className="JoinBoxDiv">
      <form onSubmit={joinNewUser}>
        <table>
          <tr>
            <td>
              <input
                type="text"
                placeholder="아이디"
                minLength={5}
                value={joinId}
                onChange={(e) => {
                  setJoinId(e.target.value);
                  setJoinCheck("중복 확인이 필요합니다");
                  setCanJoin(false);
                }}
              />
            </td>
            <td>
              <button type="button" onClick={canJoinChecke}>
                {joinCheck}
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <input
                type="password"
                placeholder="비밀번호"
                value={joinPw}
                onChange={(e) => setJoinPw(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={joinPw2}
                onChange={(e) => setJoinPw2(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <input
                type="email"
                placeholder="이메일"
                value={joinEmail}
                onChange={(e) => setJoinEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                placeholder="이름"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
              />
            </td>
            <td>
              <button type="button" onClick={toggleGender}>
                {joinGender}
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <input
                type="number"
                placeholder="나이"
                value={joinAge}
                onChange={(e) => setJoinAge(Number(e.target.value))}
              />
              <input type="submit" value="가입하기" />
            </td>
          </tr>
        </table>
      </form>
      {showPopup && (
        <LoginFail message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
