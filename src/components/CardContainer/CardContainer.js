import React from "react";
import "./CardContainer.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
function CardContainer({ theaterData, setSelectedDate, selectedDate, favorites, setFavorites }) {
  const dayjs = require('dayjs')
  dayjs.locale('en');

  const justSelectedDay = theaterData.reduce((acc, theater) => {
    theater.showtimes.forEach(showtime => {
    const showtimeDate = dayjs(showtime.date).format("YYYY-MM-DD");
    const selectedDateFormatted = dayjs(selectedDate).format("YYYY-MM-DD");
      if (showtimeDate === selectedDateFormatted) {
       return acc.push(showtime)
      }
    })
    return acc
  }, [])
  console.log('justSelectedDay', justSelectedDay)
  
 const showtimeCards = 
   justSelectedDay.map(showtime => {
      return (
        <Card
        showtime={showtime}
          key={showtime.key}
          // id={showtime.id}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      );

} )
    
  
  return (
    <div>
      <NavBar setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
      <Link to='/favorites'>
        <button className='nav-btn'>favorited</button>
      </Link>
      <h1>Showing screenings on {dayjs(selectedDate).format("MMM. D")}</h1>
      <div className='cards-container'>
        {showtimeCards}
        </div>
    </div>
  );
}

export default CardContainer;
