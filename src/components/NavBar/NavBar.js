import React from "react";
import "./NavBar.css";
import PropTypes from 'prop-types'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {useState} from 'react'

dayjs.extend(utc);
dayjs.extend(timezone);

function NavBar({setSelectedDate, selectedDate}) {
  const dayjs = require("dayjs");
  const today = dayjs();
  const date30DaysLater = today.add(30, "day");

  const [inputValue, setInputValue] = useState(today.format('YYYY-MM-DD'));
  const handleDateChange = (event) => {
    const newSelectedDate = dayjs(event.target.value);
    const formattedDate = newSelectedDate.format('YYYY-MM-DD');
    if (newSelectedDate.isBefore(today, 'day')) {
      alert("Please select a date in the future ☺");
    } else if (newSelectedDate.isAfter(date30DaysLater, 'day')) {
      alert(`Please select a date on or before ${date30DaysLater.format('MMM. D')}`)
    } else {
      const formattedDate = newSelectedDate.format('YYYY-MM-DD');
      setInputValue(formattedDate);
      setSelectedDate(formattedDate)
    }
  };
 
  
  return (
    <nav>
      <form>
      <label htmlFor='date'>Select a date: </label>
      <input
        type='date'
        id='date'
        name='date'
        value={inputValue}
        min={today.format('YYYY-MM-DD')}
        max={date30DaysLater}
        onChange={handleDateChange}
      />
      </form>
    </nav>
  );
}

export default NavBar;

NavBar.propTypes = {
  setSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
};