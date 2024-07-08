import React from "react";
import UserData from "../components/UserData";

export default function User({ ID }) {
  return (
    <div>
      <UserData ID={ID}></UserData>
    </div>
  );
}
