import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar({setSelectedDate, selectedDate}) {
  const dayjs = require("dayjs");
  const today = dayjs();
  const date30DaysLater = today.add(30, "day");
  console.log(today);

  return (
    <nav>
      <label htmlFor='date'>Select a date: </label>

      <input
        type='date'
        id='date'
        name='date'
        value={today}
        min={today}
        max={date30DaysLater}
        onChange={event => setSelectedDate(event.target.value)}
      />
    </nav>
  );
}

export default NavBar;
