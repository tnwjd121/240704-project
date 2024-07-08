import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header({ ID, LoginOrNot, setID, setLoginOrNot }) {
  const LogOut = () => {
    setID("");
    setLoginOrNot(false);
  };

  return (
    <header id="header">
      <div id="Logo">
        <Link to="/" className="link-style">
          TRIP
        </Link>
      </div>
      <div id="nav">
        <nav>
          <ul id="nav-text">
            <li>
              <Link to="/test" className="link-style">
                테스트 메뉴
              </Link>
            </li>
            <li>
              <Link to="/test" className="link-style">
                테스트 메뉴
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="user">
        <div className="user">
          {LoginOrNot ? (
            <Link to="/User">
              <FaRegUserCircle /> {ID}님
            </Link>
          ) : (
            <Link to="/login">
              <FaRegUserCircle /> Login
            </Link>
          )}
        </div>
        <div className="user link">
          {LoginOrNot ? (
            <div onClick={() => LogOut()}>
              <FaRegUserCircle /> Logout
            </div>
          ) : (
            <Link to="/Join">
              <FaRegUserCircle /> Join
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
