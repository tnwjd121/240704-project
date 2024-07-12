import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export default function Header({
  ID,
  LoginOrNot,
  setID,
  setLoginOrNot,
  Cookies,
}) {
  const navigate = useNavigate();
  const LogOut = () => {
    setID("");
    setLoginOrNot(false);
    navigate("/");
    Cookies.remove("ID");
    Cookies.remove("LoginOrNot");
  };

  const [menuStates, setMenuStates] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false
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
                    <Link to="/trinregistration" className="link-style">
                      여행 정보 등록
                    </Link>
                  </li>
                  <li>
                    <Link to="/festivalReg" className="link-style">
                      축제 등록
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
                      여행 현황
                    </Link>
                  </li>
                  <li>
                    <Link to="/festival" className="link-style">
                      축제 현황
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              onMouseEnter={() => toggleMenu("menu3")}
              onMouseLeave={() => toggleMenu("menu3")}
            >
              <span>
                검색
                <FaChevronDown className="react-icon" />
              </span>
              {menuStates.menu3 && (
                <ul id="side-nav">
                  <li>
                    <Link to="/searchtrdomesticcategory" className="link-style">
                      국내 여행
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchtroverseascategory" className="link-style">
                      해외 여행
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchFes" className="link-style">
                      축제
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              onMouseEnter={() => toggleMenu("menu4")}
              onMouseLeave={() => toggleMenu("menu4")}
            >
              <span>
                랭킹
                <FaChevronDown className="react-icon" />
              </span>
              {menuStates.menu4 && (
                <ul id="side-nav">
                  <li>
                    <Link to="/ranking" className="link-style">
                      여행지 랭킹
                    </Link>
                  </li>
                  <li>
                    <Link to="/fesranking" className="link-style">
                      축제 랭킹
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
              <FaRegUserCircle />{ID}님
            </Link>
          ) : (
            <Link to="/login">
              <FaRegUserCircle /> Login
            </Link>
          )}
        </div>
        <div className="user link">
          {LoginOrNot ? (
            <div onClick={() => LogOut()} className="logout">
              <FaRegUserCircle />Logout
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
