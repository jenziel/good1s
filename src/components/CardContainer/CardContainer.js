import React from "react";
import "./CardContainer.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
function CardContainer({ vidiotsShowtimes }) {
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
      <NavBar />
      <Link to='/favorites'>
        <button className='nav-btn'>favorited</button>
      </Link>
      <div className='cards-container'>{showtimeCards}</div>
    </div>
  );
}

export default CardContainer;
