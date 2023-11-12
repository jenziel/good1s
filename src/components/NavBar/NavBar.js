import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'

function NavBar({setSelectedDate, selectedDate}) {
  const dayjs = require("dayjs");
  const today = dayjs();
  const date30DaysLater = today.add(30, "day");
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

NavBar.propTypes = {
  setSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
};