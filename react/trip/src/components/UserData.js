import React, { useEffect, useState } from "react";
import "../css/User.css";
import UserUpdate from "./UserUpdate";

export default function UserData({ ID }) {
  const [userData, setUserData] = useState({
    uEmail: "",
    uName: "",
    uGender: "",
    uAge: "",
  });
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const api = `http://localhost:8080/User/UserInfo/id=${ID}`;
      try {
        const response = await fetch(api);
        const data = await response.json();
        setUserData({
          uEmail: data.Email,
          uName: data.name,
          uGender: data.gender ? "남자" : "여자",
          uAge: data.age,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ID]);

  return (
    <div className="UserDataDiv">
      <h2>{ID}님</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td className="td1">메일</td>
              <td className="td2">{userData.uEmail}</td>
            </tr>
            <tr>
              <td className="td1">이름</td>
              <td className="td2">{userData.uName}</td>
            </tr>
            <tr>
              <td className="td1">성별</td>
              <td className="td2">{userData.uGender}</td>
            </tr>
            <tr>
              <td className="td1">나이</td>
              <td className="td2">{userData.uAge}</td>
            </tr>
            <tr>
              <td className="td1"></td>
              <td className="td2"></td>
              <td className="td3">
                <button onClick={() => setShowUpdate(true)}>수정</button>
                {showUpdate && (
                  <UserUpdate
                    ID={ID}
                    userData={userData}
                    onClose={() => setShowUpdate(false)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
