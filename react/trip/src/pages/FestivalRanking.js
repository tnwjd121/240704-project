import React, { useEffect, useState } from 'react'
import '../css/festivalRankig.css'
import FestivalRank from '../components/FestivalRank'
import FestivalMonth from '../components/FestivalMonth'
export default function FestivalRanking() {
  const [date, setDate] = useState("")
  const [selectOption, setSelectOption] = useState('전체');

  useEffect(()=>{
    let day = new Date().toISOString().substring(0,10)
    document.getElementById('currentDate').value = day
    setDate(day)
  },[])

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

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
    {value:"제주도", label:"제주도"},
    {value:"해외", label:"해외"}  
  ]

  return (
    <div className='body'>
      <h1>축제 랭킹</h1>
        <div id='date-div'>
          <span>기준 날짜 : </span>
          <input type='date' id='currentDate' onChange={handleDateChange} />
        <select 
          id='currentDate' 
          value={selectOption} 
          onChange={(e)=>setSelectOption(e.target.value)}
        >
          {kRegion.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        </div>
        <FestivalRank date={date} selectOption={selectOption}/>
        <FestivalMonth date={date} selectOption={selectOption}/>
    </div>
  )
}
