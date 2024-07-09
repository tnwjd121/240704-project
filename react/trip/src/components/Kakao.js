import React, { useEffect, useState } from 'react'
const {kakao} = window;

export default function Kakao() {


    // 지도 
    useEffect(() => {
      const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
      const options = {
        center: new kakao.maps.LatLng(33.450701,126.570667), // 지도의 중심좌표
        level:3
      }
      const map = new kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
      // 마커 표시
      let markerPosition = new kakao.maps.LatLng(
        33.450701,
        126.570667
      )
      // 마커 생성
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      })
      marker.setMap(map)

      
    }, [])

    // const geocoder = new kakao.maps.services.Geocoder();

    // const callback = function(result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //       console.log(result);
    //   }
    // };
    // geocoder.addressSearch('해남군 송지면', callback);

  return (
    <div id="map" style={{width:'800px', height:'400px'}}></div>
  )
}
