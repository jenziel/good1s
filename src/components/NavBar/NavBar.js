import React from "react";
import "./NavBar.css";
import PropTypes from "prop-types";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

function NavBar({ setSelectedDate }) {
  dayjs.tz.setDefault("America/Los_Angeles");
  const today = dayjs().tz();
  const todayFormatted = today.format("YYYY-MM-DD");
  const date30DaysLater = today.add(30, "day").format("YYYY-MM-DD");
  const [inputValue, setInputValue] = useState(today.format("YYYY-MM-DD"));

  const handleDateChange = (event) => {
    const newSelectedDate = dayjs(event.target.value);
    if (newSelectedDate.isBefore(today, "day")) {
      alert("Please select a date in the future ☺");
    } else if (newSelectedDate.isAfter(date30DaysLater, "day")) {
      alert(
        `Please select a date on or before ${date30DaysLater.format("MMM. D")}`
      );
    } else {
      setInputValue(newSelectedDate.format("YYYY-MM-DD"));
      setSelectedDate(newSelectedDate);
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
          min={todayFormatted}
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
  selectedDate: PropTypes.object.isRequired,
};
