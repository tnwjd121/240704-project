import React from "react";
import LoginBox from "../components/LoginBox";

export default function Login({ setID, setLoginOrNot }) {
  return (
    <div>
      <LoginBox setID={setID} setLoginOrNot={setLoginOrNot}></LoginBox>
    </div>
  );
}
