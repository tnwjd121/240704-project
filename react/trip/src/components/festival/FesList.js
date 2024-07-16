import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../css/FesList.css"
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";
import FesEdit from './FesEdit';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 12;

export default function Feslist() {
  const [festivals, setFestivals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectOption, setSelectOption] = useState('국내');
  const [selectOption2, setSelectOption2] = useState('전체');
  const navigate = useNavigate();

  useEffect(()=>{
    fetchFestivals()
  },[selectOption, selectOption2])

  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/festivals`)
      const festivalData = response.data._embedded.festivals
      const fiteredFestival = festivalData.filter(festival => {
        if(selectOption === '국내') {
          if(selectOption2 === '전체'){
            return festival.country === '국내';
          }else{
            return festival.region === selectOption2
          }
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
    if(window.confirm("정말 삭제하시겠습니까?")){
      try {
        const response = await axios.delete(`${url}`)
        fetchFestivals()
        console.log(url)
      } catch (error) {
        console.error("삭제 실패 :", error);
      }
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
    console.log(data)
    if(data.country==='국내'){
      navigate(`/KFesDetail/${id}`)
    }else if(data.country==='해외'){
      navigate(`/FFesDetail/${id}`)
    }
  }

  const kRegion=[
    {value:"전체", label:"전체"},
    {value:"서울", label:"서울"},
    {value:"인천", label:"인천"},
    {value:"대전", label:"대전"},
    {value:"대구", label:"대구"},
    {value:"광주", label:"광주"},
    {value:"부산", label:"부산"},
    {value:"울산", label:"울산"},
    {value:"세종시", label:"세종시"},
    {value:"경기도", label:"경기도"},
    {value:"강원도", label:"강원도"},
    {value:"충청북도", label:"충청북도"},
    {value:"충청남도", label:"충청남도"},
    {value:"경상북도", label:"경상북도"},
    {value:"경상남도", label:"경상남도"},
    {value:"전북특별자치도", label:"전북특별자치도"},
    {value:"전라남도", label:"전라남도"},
    {value:"제주도", label:"제주도"}
  ]

  return (
    <div>
      <h1>축제 현황</h1>
      <select 
        id='fes-option' 
        value={selectOption} 
        onChange={(e)=>{setSelectOption(e.target.value)}}
      >
        <option>국내</option>
        <option>해외</option>
      </select> 
      {selectOption === "국내" && (
        <select 
          id='fes-option' 
          value={selectOption2} 
          onChange={(e)=>setSelectOption2(e.target.value)}
        >
          {kRegion.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
        <div id='fes-center'>
          <div className='fes-list'>
          {currentFestivals.map(festival => (
            <div key={festival.id} className='fes-item'>
              <div className='img-div'>
                <img src={festival.imageUrl} alt={festival.fesName} onClick={()=>getId(festival)}></img>
              </div>
              <div className='fes-infom'>
                <p>축제 이름: {festival.fesName}</p>
                {festival.country==="국내" && (<p>지역: {festival.region}</p>)}
                {festival.country==="해외" && (<p>국가: {festival.countryName}</p>)}
                <p>{festival.startDate} ~ {festival.endDate}</p>
                <p>
                  <FesEdit festival={festival} fetchFestivals={fetchFestivals}/>
                  <RiDeleteBin5Line className='fes-icon' onClick={()=>deleteSubmit(festival._links.self.href)}/>
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
