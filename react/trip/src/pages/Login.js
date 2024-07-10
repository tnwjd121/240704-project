import React from "react";
import LoginBox from "../components/LoginBox";

export default function Login({ setID, setLoginOrNot, Cookies }) {
  return (
    <div>
      <LoginBox
        setID={setID}
        setLoginOrNot={setLoginOrNot}
        Cookies={Cookies}
      ></LoginBox>
    </div>
  );
}
