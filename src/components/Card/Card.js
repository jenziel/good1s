import React, { useState } from "react";
import heartFilled from "../../images/heartFilled.png";
import heartOutline from "../../images/heartOutline.png";
import "./Card.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);

function Card({
  showtime,
  favorites,
  setFavorites,
}) {
  const pacificTimeZone = "America/Los_Angeles";

console.log(favorites, 'favorites')
  function isFavorite() {
    return favorites.some((favorite) => favorite['_id'] === showtime['_id']);
  }
  

  function toggleFavorite(event){
    event.preventDefault();
    if (isFavorite()) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite['_id'] !== showtime['_id']
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, showtime]);
    }
  }
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="card">
      <div className="favorites-btn-container">
        <button className="favorites-btn" onClick={toggleFavorite}>
          {!isFavorite() ? (
            <img
              src={heartOutline}
              alt="heart outline"
              className="favorites-img"
            />
          ) : (
            <img
              src={heartFilled}
              alt="heart filled"
              className="favorites-img"
            />
          )}
        </button>
      </div>
      <div className="card-info" id={showtime.key}>
        <Link
          to={showtime.theaterUrl}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <p className="card-theater-name">{showtime.theaterName}</p>
        </Link>
        <Link
          to={showtime.URL}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="showing-info">
            {showtime.movies.length === 1 ? (
              showtime.movies[0].director &&
              showtime.movies[0].director.trim() ? (
                <div>
                  <p className="card-title-extended">
                    <span className="card-title">
                      {" "}
                      {showtime.movies[0].title}
                    </span>
                    {showtime.movies[0].year ? `, ${showtime.movies[0].year}` : ""}
                  </p>
                  <p className="card-director">{" "}{showtime.movies[0].director} </p>
                </div>
              ) : (
                <p className="card-title-extended">
                  <span className="card-title">
                    {" "}
                    {showtime.movies[0].title}{" "}
                  </span>
                  {showtime.movies[0].year ? `, ${showtime.movies[0].year}` : ""}
                </p>
              )
            ) : (
              <div>
                {showtime.movies.map((movie) => (
                  <div key={movie.title}>
                    <p className="card-title-extended">
                      <span className="card-title">
                        {" "}
                        {movie.title}
                      </span>
                      , {movie.year}
                    </p>
                    <p className="card-director">
                      {movie.director}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
         
          
            <p className="card-time">
              {dayjs(showtime.date).tz(pacificTimeZone).format("hh:mm A")}
            </p>
        
        </Link>
      </div>
    </div>
  );
}

export default Card

Card.propTypes = {
  showtime: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
};