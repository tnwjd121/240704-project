import React from 'react'
import '../css/footer.css'
import { IoLogoGithub } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div id='link-logo'>
        <ul id='link-ul'>
          <li><IoLogoGithub/></li>
          <li><FaTwitter /></li>
          <li><FaInstagram /></li>
          <li><FaFacebook /></li>
        </ul>
      </div>
      <div className='footer-text'>2024 Team Project</div>
      <div className='footer-text'>김강태, 구형준, 백수정, 안성빈</div>
    </footer>
  )
}
