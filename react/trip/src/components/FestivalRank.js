import React, { useEffect, useState } from 'react'
import { SERVER_URL } from './Api';
import axios from 'axios';
import '../css/festivalRankig.css'
import { useNavigate } from 'react-router-dom';
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";
import '../css/festivalrank.css'

const PAGE_SIZE = 5;

export default function FestivalRank({date, selectoption}) {

  const [festivalRank, setFestivalRank] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  

  useEffect(()=>{
    feslist()
    setCurrentPage(1)
  },[date])
  useEffect(()=>{
    feslist()
    setCurrentPage(1)
  },[selectoption])

  const feslist = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/festivals`)
      const fesData = response.data._embedded.festivals
      
      const filterRegion = fesData.filter(festival => {
        if(selectoption === '전체'){
          return festival.country === '국내' || festival.country === '해외';
        }else if(selectoption === '해외'){
          return festival.country === '해외'
        }else{
          return festival.region === selectoption
        }
      })

      const filterRank = filterRegion.filter(fes => {
        const startday =  fes.startDate;
        const endday = fes.endDate;
        return startday <= date && date <=endday;
      })
      const sortedRank = filterRank.sort((a,b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate)
        return dateA - dateB;
      })
      setFestivalRank(sortedRank)
    } catch (error) {
      console.error("랭킹오류 :", error);
    }
  }

  const rankTotalPages = Math.ceil(festivalRank.length / PAGE_SIZE);
  const rankfess = festivalRank.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleNextPage = () => {
    setCurrentPage(next => Math.min(next+1, rankTotalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev-1, 1))
  }

  const getId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf('/') + 1)
    if(data.country==='국내'){
      navigate(`/KFesDetail/${id}`)
    }else if(data.country==='해외'){
      navigate(`/FFesDetail/${id}`)
    }
  }
  
  return (
    <div id='fes-day-rank'>
      <h2>진행중인 축제(개최일 순)</h2>
      <div id='rank-fes-list'>
        {rankfess.map(fes=>(
          <div id='rank-item'>
            <div className='img-item'>
              <img src={fes.imageUrl} alt={fes.fesName} onClick={()=>getId(fes)}></img>
            </div>
            <div className='fes-info'>
              <p>축제명: {fes.fesName}</p>
              <p>지역: {fes.region}</p>
              <p>기간: {fes.startDate}~{fes.endDate}</p>
            </div>
          </div>
          ))}
      </div>
        <button id='left-button' onClick={handlePrevPage} disabled={currentPage === 1}><GrCaretPrevious className='button-icon'/></button>
        <button id='right-button' onClick={handleNextPage} disabled={currentPage === rankTotalPages}><GrCaretNext  className='button-icon'/></button>  
    </div>
  )
}
