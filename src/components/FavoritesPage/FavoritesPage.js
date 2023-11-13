import React from "react";
import "./FavoritesPage.css";
import { Link } from "react-router-dom";
import emptyBurst from "../../images/emptyBurst.png";
import PropTypes from "prop-types";
import Card from "../Card/Card"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function FavoritesPage({ favorites, setFavorites }) {
  const pacificTimeZone = "America/Los_Angeles";
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const favoriteCards = favorites.map((showtime) => {
    
    return (
      <div key={showtime['_id']}>
        <p className="card-date">
              {dayOfWeekNames[dayjs(showtime.date).day()]}{" "}
              {dayjs(showtime.date).tz(pacificTimeZone).format("MMM. D")}
            </p>
        <Card
          showtime={showtime}
          favorites={favorites}
          setFavorites={setFavorites}
          key={showtime['_id']}
        />
      </div>
    );
  });
  return (
    <div className='favorited-page'>
      <Link to='/'>
        <button className='favorites-nav-btn nav-btn'>back to home</button>
      </Link>
      <h1 className='page-title fav-title'>Favorited</h1>
      {favorites.length === 0 ? (
        <div className='favorited-empty'>
            <img src={emptyBurst} className='favorited-burst'></img>
            <p className='favorited-message'>No favorites yet.</p>
            <p className='favorited-message'>
              {" "}
              When you save a movie it will appear here.
            </p>
          </div>
      ) : (
        <div className='favorited-container'>
        <h1>{favoriteCards}</h1>
          </div>
      )}
    </div>
  );
}

export default FavoritesPage;

FavoritesPage.propTypes = {
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
};
