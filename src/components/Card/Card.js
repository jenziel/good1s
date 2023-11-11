import React from "react";
import heartFilled from "../../images/heartFilled.png";
import heartOutline from "../../images/heartOutline.png";
import "./Card.css";
import "dayjs/locale/en";
import { useState } from "react";
import { Link } from 'react-router-dom'

function Card({
  //  title, year, director, date,
  key,
  showtime,
  favorites,
  setFavorites,
}) {
  const dayjs = require("dayjs");
  dayjs.locale("en");
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    {
      !isFavorited ? setIsFavorited(true) : setIsFavorited(false);
    }
  };
  const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
          )}
        </button>
      </div>
     <div className='card-info' id={key}>
      <Link to={showtime.theaterUrl} style={{color: 'inherit', textDecoration: 'inherit'}}>
        <p className='card-theater-name'>{showtime.theaterName}</p>
      </Link>
      <Link to={showtime.URL} style={{color: 'inherit', textDecoration: 'inherit'}}>

      <div className='showing-info'>


        {showtime.movies.length === 1 ? (
          showtime.movies[0].director.trim() ? (
            <div>
           
             
            <p className='card-title-extended'><span className='card-title'>

            {" "}
            {showtime.movies[0].title}
            </span>
            {showtime.movies[0].year ? `, ${showtime.movies[0].year}` : ""}
          </p>
        
          <p className='card-director'>{" "}
            {showtime.movies[0].director} </p>
            </div>
          )
          : (
          
          <p className='card-title-extended'><span className='card-title'>
          {" "}
          {showtime.movies[0].title} </span>
          {showtime.movies[0].year ? `, ${showtime.movies[0].year}` : ""}
        </p>
        
        ) ) :(
          
          <div>
            {showtime.movies.map((movie) => (
              <p key={movie.title} className='card-title-extended'>
                <span className='card-title'>

                {" "}
                {movie.title}
                </span>
                , {movie.year} | {movie.director}
              </p>
            ))}
          </div>
        )}
      </div>
        
        <div className='timeBox'>

        <p className='card-date'>{dayOfWeekNames[dayjs(showtime.date).day()]} {dayjs(showtime.date).format("MMM. D")}</p>
       
              
        <p className='card-time'>{dayjs(showtime.date).format("hh:mm A")}</p>
             
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
