import { useEffect, useState } from "react";
import "./App.css";
import "dayjs/locale/en";
import FavoritesPage from "../src/components/FavoritesPage/FavoritesPage";
import CardContainer from "./components/CardContainer/CardContainer";
import { Routes, Route } from "react-router-dom";
import ErrorComponent from "../src/components/ErrorComponent/ErrorComponent";
import Loading from "../src/components/Loading/Loading";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
dayjs.extend(utc);

function App() {
  dayjs.tz.setDefault("America/Los_Angeles");
  const today = dayjs().tz();
  const [selectedDate, setSelectedDate] = useState(today);
  const [theaterData, setTheaterData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function getTheaterKeys() {
    return fetch("https://teleology.foundation/movies/theaters")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to get theater info. ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        throw error;
      });
  }

  function getTheaterKeysArray() {
    return getTheaterKeys()
      .then((data) => {
        return Promise.all(
          data.map((theater) =>
            fetch(`https://teleology.foundation/movies/${theater.key}`)
              .then((response) => response.json())
              .then((showtimes) => ({ ...theater, showtimes: showtimes }))
          )
        );
      })
      .then((responses) => {
        setTheaterData(responses);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  useEffect(() => {
    if (errorMessage === "") {
      getTheaterKeysArray();
    }
  }, [errorMessage]);

  const resetError = () => {
    setErrorMessage("");
  };

  return (
    <div>
      {theaterData.length === 0 && errorMessage ? (
        <ErrorComponent errorMessage={errorMessage} resetError={resetError} />
      ) : (
        <main className='App'>
          <Routes>
            {theaterData.length === 0 ? (
              <Route path='/' element={<Loading />} />
            ) : errorMessage ? (
              <Route
                path='/'
                element={
                  <ErrorComponent
                    errorMessage={errorMessage}
                    resetError={resetError}
                  />
                }
              />
            ) : (
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
            )}
            <Route
              path='/favorites'
              element={
                <FavoritesPage
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
            <Route path='*' element={<ErrorComponent />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
