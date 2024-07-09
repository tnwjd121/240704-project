import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import LoginFail from "./LoginFail";

export default function LoginBox({ setID, setLoginOrNot }) {
  const [LoginID, setLoginID] = useState("");
  const [LoginPW, setLoginPW] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const LoginApi = (event) => {
    event.preventDefault();

    const api = `http://localhost:8080/User/Login/id=${LoginID}&pw=${LoginPW}`;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data === true) {
          console.log("로그인 성공");
          setID(LoginID);
          setLoginOrNot(true);
          navigate("/");
        } else {
          console.log("로그인 실패");
          setPopupMessage("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
          setShowPopup(true);
        }
      })
      .catch((error) => {
        console.error("네트워크 오류:", error);
        // 다음 로직 추가
      });
  };

  return (
    <div className="LoginBoxDiv">
      <h2>로그인</h2>
      <div>
        <form onSubmit={LoginApi}>
          <input
            type="text"
            placeholder="아이디"
            className="in"
            value={LoginID}
            onChange={(e) => setLoginID(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="in"
            value={LoginPW}
            onChange={(e) => setLoginPW(e.target.value)}
          />
          <input type="submit" id="btn" value="로그인" />
        </form>
        <a href="#none">비밀번호를 잊어버리셨나요?</a>
      </div>
      {showPopup && (
        <LoginFail message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
