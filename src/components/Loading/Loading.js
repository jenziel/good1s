import React from "react";
import "./Loading.css";
import spinner from "../../images/spinnerGray.png";
function Loading() {
  return (
    <div className='loading-page'>
      <div className='loading-spinner-container'>
        <img src={spinner} className='spinner'></img>
        <p className='loading-title'>loading...</p>
      </div>
    </div>
  );
}

export default Loading;
