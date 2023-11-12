import React from "react";
import "./NavBar.css";
import PropTypes from 'prop-types'

function NavBar({setSelectedDate, selectedDate}) {
  const dayjs = require("dayjs");
  const today = dayjs();
  const date30DaysLater = today.add(30, "day");

  const handleDateChange = (event) => {
    const selectedDate = dayjs(event.target.value);

    if (selectedDate.isBefore(today, 'day')) {
      alert("Please select a date in the present or future ☺");
    } 
    if (selectedDate.isAfter(date30DaysLater, 'day')) {
      alert(`Please select a date on or before ${date30DaysLater.format('MMM. D')}`)
    } 
    else {
      setSelectedDate(event.target.value);
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
        value={today}
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