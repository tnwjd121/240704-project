import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../css/triplist.css"
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";
import TripModal from '../../pages/TripModal';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 12;

export default function Feslist() {
  const [festivals, setFestivals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectOption, setSelectOption] = useState('국내');
  const navigate = useNavigate();

  useEffect(()=>{
    fetchFestivals()
  },[selectOption])

  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/festivals`)
      const festivalData = response.data._embedded.festivals
      const fiteredFestival = festivalData.filter(festival => {
        if(selectOption === '국내') {
          return festival.country === '국내';
        }else{
          return festival.country !== '국내';
        }
      })
      setFestivals(fiteredFestival)
    } catch (error) {
      console.error("카테고리 목록 에러 발생: " , error);
    }
  }

  const deleteSubmit = async (url) =>{
    try {
      const response = await axios.delete(`${url}`)
      fetchFestivals()
    } catch (error) {
      console.error("삭제 실패 :", error);
    }
  } 
  const totalPages = Math.ceil(festivals.length / PAGE_SIZE);
  const currentFestivals = festivals.slice((currentPage -1)*PAGE_SIZE, currentPage *PAGE_SIZE);

  const handleNextPage = () => {
    setCurrentPage(next => Math.min(next+1, totalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev-1, 1))
  }

  const getId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf('/') + 1)
    navigate(`/fesDetail/${id}`)
  }


  return (
    <div>
      <h1>축제 목록</h1>
      <select 
        id='category-option' 
        value={selectOption} 
        onChange={(e)=>setSelectOption(e.target.value)}
      >
        <option>국내</option>
        <option>해외</option>
      </select>
        <div id='category-center'>
          <div className='category-list'>
          {currentFestivals.map(festival => (
            <div key={festival.id} className='category-item'>
              <div className='img-div'>
                <img src={festival.imageUrl} alt={festival.fesName} onClick={()=>getId(festival)}></img>
              </div>
              <div className='category-info'>
                <p>축제이름: {festival.fesName}</p>
                {festival.country==="국내" && (<p>지역: {festival.region}</p>)}
                {festival.country==="해외" && (<p>국가명: {festival.countryName}</p>)}
                <p>{festival.startDate} ~ {festival.endDate}</p>
                <p>
                  <TripModal festival={festival} fetchFestivals={fetchFestivals}/>
                  <RiDeleteBin5Line className='category-icon' onClick={()=>deleteSubmit(festival._links.self.href)}/>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button id='left-button' onClick={handlePrevPage} disabled={currentPage === 1}><GrCaretPrevious className='button-icon'/></button>
      <button id='right-button' onClick={handleNextPage} disabled={currentPage === totalPages}><GrCaretNext  className='button-icon'/></button>
    </div>
  )
}
