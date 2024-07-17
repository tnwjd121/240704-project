import React from "react";

import '../css/main.css'
import MainTripList from "../components/MainTripList";
import MainFes from "../components/MainFes";

export default function Main() {
  return (
    <div className="body">
      <MainTripList/>
      <MainFes/>
    </div>
  );
}
