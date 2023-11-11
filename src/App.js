import { useEffect, useState } from "react";
import "./App.css";
import { getTheaterKeys} from "./apiCalls";
import "dayjs/locale/en";
import FavoritesPage from "../src/components/FavoritesPage/FavoritesPage";
import CardContainer from "./components/CardContainer/CardContainer";
import { Routes, Route } from "react-router-dom";

function App() {
  const dayjs = require("dayjs");
  dayjs.locale("en");
  const [selectedDate, setSelectedDate] = useState(dayjs().toISOString());
  const [theaterData, setTheaterData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  function getTheaterKeysArray() {
    getTheaterKeys().then((data) => {
      Promise.all(
        data.map((theater) => {
          return fetch(`https://teleology.foundation/movies/${theater.key}`)
            .then((response) => response.json())
            .then((showtimes) => {
              return { ...theater, showtimes: showtimes };  
            });
        })
      ).then((responses) => {
        return setTheaterData(responses)
      })
    });
  }


  useEffect(() => {
    getTheaterKeysArray()
  }, []);

  useEffect(() => {
    console.log('theaterData', theaterData);
  }, [theaterData]);

  return (
    <div>
      {theaterData.length === 0 ? (
        <p>loading...</p>
      ) : (
        <main className='App'>
          <Routes>
            <Route
              path='/'
              element={
                <CardContainer
                  theaterData={theaterData}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
            <Route
              path='/favorites'
              element={
                <FavoritesPage
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
