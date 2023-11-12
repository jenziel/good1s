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
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    setIsFavorited(!isFavorited);
  };

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
        <button className="favorites-btn" onClick={handleClick}>
          {!isFavorited ? (
            <img
              src={heartOutline}
              alt="heart outline"
              className="favorites-img"
            />
          ) : (
            <img
              src={heartFilled}
              alt="heart outline"
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
          <div className="timeBox">
            <p className="card-date">
              {dayOfWeekNames[dayjs(showtime.date).day()]}{" "}
              {dayjs(showtime.date).tz(pacificTimeZone).format("MMM. D")}
            </p>
            <p className="card-time">
              {dayjs(showtime.date).tz(pacificTimeZone).format("hh:mm A")}
            </p>
          </div>
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