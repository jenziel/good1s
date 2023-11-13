import React from "react";
import "./CardContainer.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function CardContainer({
  theaterData,
  setSelectedDate,
  selectedDate,
  favorites,
  setFavorites,
}) {
  const pacificTimeZone = "America/Los_Angeles";

  const justSelectedDay = theaterData.reduce((acc, theater) => {
    if (theater.showtimes && Array.isArray(theater.showtimes)) {
      theater.showtimes.forEach((showtime) => {
        const showtimeDate = dayjs(showtime.date).tz(pacificTimeZone).format("YYYY-MM-DD");
        const selectedDateFormatted = dayjs(selectedDate).tz(pacificTimeZone).format("YYYY-MM-DD");
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
console.log('just selected day', justSelectedDay)
  const showtimeCards = justSelectedDay.map((showtime) => {
    if (showtime.movies.length > 0) {
      return (
        <Card
          showtime={showtime}
          id={showtime['_id']}
          key={showtime['_id']}
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