import React, { useEffect, useState } from 'react'
import '../css/festivalRankig.css'
import FestivalRank from '../components/FestivalRank'
import FestivalMonth from '../components/FestivalMonth'
export default function FestivalRanking() {
  const [date, setDate] = useState("")

  useEffect(()=>{
    let day = new Date().toISOString().substring(0,10)
    document.getElementById('currentDate').value = day
    setDate(day)
  },[])

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className='body'>
      <h1>축제 랭킹</h1>
        <div id='date-div'>
          <span>기준 날짜 : </span>
          <input type='date' id='currentDate' onChange={handleDateChange}></input>
        </div>
        <FestivalRank date={date}/>
        <FestivalMonth date={date}/>
    </div>
  )
}
