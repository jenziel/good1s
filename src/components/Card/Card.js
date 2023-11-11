import React from "react";
import heartFilled from "../../images/heartFilled.png";
import heartOutline from "../../images/heartOutline.png";
import "./Card.css";
import "dayjs/locale/en";
import { useState } from "react";

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
        <h2>{showtime.theater}</h2>
        <p>{dayjs(showtime.date).format("MMM. D YYYY | hh:mm A")}</p>

        {showtime.movies.length === 1 ? (
          showtime.movies[0].director ? (
            <p>
            {" "}
            {showtime.movies[0].title}, {showtime.movies[0].year} | dir. by {" "}
            {showtime.movies[0].director} 
          </p>
          )
         : (<p>
          {" "}
          {showtime.movies[0].title}, {showtime.movies[0].year}
        </p>) ) : (

          <div>
            {showtime.movies.map((movie) => (
              <p key={movie.title}>
                {" "}
                {movie.title}, {movie.year} | dir. by {movie.director})
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
