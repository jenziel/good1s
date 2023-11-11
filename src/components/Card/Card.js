import React from "react";
import heartFilled from "../../images/heartFilled.png";
import heartOutline from "../../images/heartOutline.png"
import "./Card.css";
import "dayjs/locale/en";
import {useState} from 'react'

function Card({ title, year, director, date, key }) {
  const dayjs = require("dayjs");
  dayjs.locale("en");
  const [isFavorited, setIsFavorited] = useState(false)

  const handleClick = () => {
    setIsFavorited(true)
  }
  
  return (
    <div className='card'>
    <div className='favorites-btn-container'>
      <button className='favorites-btn' onClick={handleClick}>
        {!isFavorited ? (

            <img
              src={heartOutline}
              alt='heart outline'
              className='favorites-img'
            ></img>
        ) : (
            <img
            src={heartFilled}
            alt='heart outline'
            className='favorites-img'
          ></img>
        )

        }
      </button>
    </div>
      <div className='card-info' id={key}>
        <p>{dayjs(date).format("MMM. D YYYY | hh:mm A")}</p>
        <p>
          {title}, {year} | dir. by {director}
        </p>
      </div>
    </div>
  );
}

export default Card;
