import React from "react";
import "./CardContainer.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import PropTypes from "prop-types";

function CardContainer({
  theaterData,
  setSelectedDate,
  selectedDate,
  favorites,
  setFavorites,
}) {
  const dayjs = require("dayjs");
  dayjs.locale("en");

  const justSelectedDay = theaterData.reduce((acc, theater) => {
    if (theater.showtimes && Array.isArray(theater.showtimes)) {
      theater.showtimes.forEach((showtime) => {
        const showtimeDate = dayjs(showtime.date).format("YYYY-MM-DD");
        const selectedDateFormatted = dayjs(selectedDate).format("YYYY-MM-DD");
        if (showtimeDate === selectedDateFormatted) {
          return acc.push({
            ...showtime,
            theaterName: theater.name,
            theaterUrl: theater.url,
          });
        }
      });
    }
    return acc;
  }, []);


  const showtimeCards = justSelectedDay.map((showtime) => {
    if (showtime.movies.length > 0) {
      return (
        <Card
          showtime={showtime}
          key={showtime.key}
          // id={showtime.id}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      );
    }
  });

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
    <div>
      <NavBar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <Link to='/favorites'>
        <button className='favorites-nav-btn nav-btn'>favorited</button>
      </Link>
      <h1 className='date-display'>
        {dayOfWeekNames[dayjs(selectedDate).day()]}{" "}
        {dayjs(selectedDate).format("MMM. D")}
      </h1>
      <div className='cards-container'>{showtimeCards}</div>
    </div>
  );
}

export default CardContainer;

CardContainer.propTypes = {
  theaterData: PropTypes.array.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
};
