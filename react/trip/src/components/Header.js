import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/header.css'
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


export default function Header() {
  const [menuStates, setMenuStates] = useState({
    menu1 :false,
    menu2 :false,
  });

  const toggleMenu = (menu) => {
    setMenuStates((prevMenus) => ({
      ...prevMenus,
      [menu] : !prevMenus[menu],
    }))
  }
  return (
    <header id='header'>
      <div id='Logo'>
        <Link to='/' className='link-style'>TRIP</Link>
      </div>
      <div id='nav'>
        <nav>
          <ul id='nav-text'>
            <li 
                onMouseEnter={() => toggleMenu('menu1')}
                onMouseLeave={() => toggleMenu('menu1')}
              >
              <span>정보 등록 <FaChevronDown className='react-icon'/></span>
              {menuStates.menu1 && (
              <ul id='side-nav'>
                <li><Link to='/test' className='link-style'>사이드 메뉴</Link></li>
                <li><Link to='/test' className='link-style'>사이드 메뉴</Link></li>
              </ul>
              )}
            </li>
            <li 
              onMouseEnter={() => toggleMenu('menu2')}
              onMouseLeave={() => toggleMenu('menu2')}
            >
              <span>정보 등록 <FaChevronDown className='react-icon'/></span>
              {menuStates.menu2 && (
              <ul id='side-nav'>
                <li><Link to='/test' className='link-style'>사이드 메뉴</Link></li>
                <li><Link to='/test' className='link-style'>사이드 메뉴</Link></li>
              </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div id='user'>
        <div className='user'><Link to='/login'><FaRegUserCircle className='react-icon'style={{marginRight:'4px'}}/> Login</Link></div>
        <div className='user'><Link to='/login'>Join</Link></div>
      </div>
    </header>
  )
}
