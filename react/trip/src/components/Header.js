import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export default function Header({ ID, LoginOrNot, setID, setLoginOrNot }) {
  const LogOut = () => {
    setID("");
    setLoginOrNot(false);
  };

  const [menuStates, setMenuStates] = useState({
    menu1: false,
    menu2: false,
  });

  const toggleMenu = (menu) => {
    setMenuStates((prevMenus) => ({
      ...prevMenus,
      [menu]: !prevMenus[menu],
    }));
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
            <li
              onMouseEnter={() => toggleMenu("menu1")}
              onMouseLeave={() => toggleMenu("menu1")}
            >
              <span>
                정보 등록 <FaChevronDown className="react-icon" />
              </span>
              {menuStates.menu1 && (
                <ul id="side-nav">
                  <li>
                    <Link to="/test" className="link-style">
                      사이드 메뉴
                    </Link>
                  </li>
                  <li>
                    <Link to="/test" className="link-style">
                      사이드 메뉴
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              onMouseEnter={() => toggleMenu("menu2")}
              onMouseLeave={() => toggleMenu("menu2")}
            >
              <span>
                여행 목록
                <FaChevronDown className="react-icon" />
              </span>
              {menuStates.menu2 && (
                <ul id="side-nav">
                  <li>
                    <Link to="/triplist" className="link-style">
                      카테고리
                    </Link>
                  </li>
                  <li>
                    <Link to="/test" className="link-style">
                      축제정보
                    </Link>
                  </li>
                </ul>
              )}
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
