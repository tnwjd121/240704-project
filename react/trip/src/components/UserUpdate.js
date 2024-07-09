import React, { useState } from "react";
import "../css/UserUpdate.css";
import { useNavigate } from "react-router-dom";

export default function UserUpdate({ ID, userData, onClose }) {
  const [showNextPage, setShowNextPage] = useState(true);
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState(userData.uEmail);
  const [name, setName] = useState(userData.uName);
  const [gender, setGender] = useState(userData.uGender);
  const [age, setAge] = useState(userData.uAge);
  const navigate = useNavigate();

  const toggleGender = () => {
    setGender((prevGender) => (prevGender === "남자" ? "여자" : "남자"));
  };

  const LoginAgain = async (event) => {
    event.preventDefault();
    const api = `http://localhost:8080/User/Login/id=${ID}&pw=${pw}`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data === true) {
        console.log("로그인 성공");
        setShowNextPage(false);
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    }
  };

  const UpdateUserData = async (event) => {
    event.preventDefault();
    const api = "http://localhost:8080/User/update";
    const updatedUserBody = {
      ID: ID,
      Password: pw,
      Email: email,
      name: name,
      gender: gender === "남자" ? true : false,
      age: age,
    };

    try {
      fetch(api, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserBody),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === true) {
            console.log("업데이트 성공");
            navigate("/");
          } else {
            console.log("업데이트 실패");
          }
        });
      onClose();
    } catch (error) {
      console.error("네트워크 오류:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {showNextPage ? (
          <form onSubmit={LoginAgain}>
            <table>
              <h2>비밀번호 재입력</h2>
              <tr>
                <td>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e) => setPw(e.target.value)}
                  />
                </td>
              </tr>
              <input type="submit" value="로그인" />
            </table>
          </form>
        ) : (
          <form onSubmit={UpdateUserData}>
            <h2>유저 정보 재입력</h2>
            <table>
              <tr>
                <td colSpan={2}>
                  <input
                    type="text"
                    placeholder="비밀번호"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" onClick={toggleGender}>
                    {gender}
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    type="number"
                    placeholder="나이"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </td>
              </tr>
            </table>
            <input type="submit" value="업데이트" />
          </form>
        )}
      </div>
    </div>
  );
}
