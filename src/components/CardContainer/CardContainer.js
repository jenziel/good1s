import React from "react";
import "./CardContainer.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
function CardContainer({ vidiotsShowtimes, setSelectedDate, selectedDate }) {
  const dayjs = require('dayjs')
  dayjs.locale('en');
  const showtimeCards = vidiotsShowtimes.map((showtime, index) => {
    return (
      <Card
        title={showtime.movies[0].title}
        year={showtime.movies[0].year}
        director={showtime.movies[0].director}
        date={showtime.date}
        key={showtime.key}
        id={showtime.id}
      />
    );
  });
  return (
    <div>
      {/* <div className='showtimes-upper'>
        <p>day before</p>
        <h1 className='page-title'>today</h1>
        <p>next day</p>
      </div> */}
      <NavBar setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
      <Link to='/favorites'>
        <button className='nav-btn'>favorited</button>
      </Link>
      <h1>Showing screenings on {dayjs(selectedDate).format("MMM. D")}</h1>
      <div className='cards-container'>{showtimeCards}</div>
    </div>
  );
}

export default CardContainer;
