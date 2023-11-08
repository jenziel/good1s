import { useEffect, useState } from "react";
import "./App.css";
import { getTheaterShowtimes } from "./apiCalls";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import Card from '../src/components/Card/Card';

function App() {
  const [vidiotsShowtimes, setVidiotsShowtimes] = useState([]);
  const dayjs = require('dayjs')
  dayjs.locale('en');
  const vidiots = "vidiots";

  function showtimesHelper(movieArray) {
    const updatedArray = movieArray.map((movieObj) => {
      return { date: movieObj.date, movies: movieObj.movies, key: movieObj.id };
    });
    return updatedArray;
  }

  function getMovies(theaterKey) {
    getTheaterShowtimes(theaterKey)
      .then((data) => {
        console.log("vidiots data", data);
        const newData = showtimesHelper(data);
        setVidiotsShowtimes(newData);
      })
      .then(() => {
        console.log("vidiots showtimes", vidiotsShowtimes);
      });
  }

  useEffect(() => {
    getMovies(vidiots);
  }, []);
  useEffect(() =>{
    console.log(vidiotsShowtimes)
  }, [vidiotsShowtimes])

  return (
    <div>
      {vidiotsShowtimes.length === 0 ? (
        <p>loading...</p>
      ) : (
        <main className='App'>
          <h1>Good1s</h1>
          <Card />
          {vidiotsShowtimes.map((showtime, index) => (
            <div key={showtime.key} className='showtime-card'>
              <p>{dayjs(showtime.date).format('MMM. D YYYY | hh:mm A')}</p>
              <p>{showtime.movies[0].title}, {showtime.movies[0].year} | dir. by {showtime.movies[0].director}</p>
              <p>_______________________________</p>
            </div>
          ))}
          {/* <p>{dayjs(vidiotsShowtimes[0].date).format('MMM. D YYYY | hh:mm A')}</p>
          <p>{vidiotsShowtimes[0].movies[0].title}, {vidiotsShowtimes[0].movies[0].year} | dir. by {vidiotsShowtimes[0].movies[0].director}</p> */}

        </main>
      )}
    </div>
  );
}

export default App;
