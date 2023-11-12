import { useEffect, useState } from "react";
import "./App.css";

import "dayjs/locale/en";
import FavoritesPage from "../src/components/FavoritesPage/FavoritesPage";
import CardContainer from "./components/CardContainer/CardContainer";
import { Routes, Route } from "react-router-dom";
import ErrorComponent from '../src/components/ErrorComponent/ErrorComponent'
import Loading from '../src/components/Loading/Loading'

function App() {
  const dayjs = require("dayjs");
  dayjs.locale("en");
  const [selectedDate, setSelectedDate] = useState(dayjs().toISOString());
  const [theaterData, setTheaterData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const[errorMessage, setErrorMessage] = useState("")
  const [needToRerender, setNeedToRerender] = useState(false)


  function getTheaterKeys() {
    return fetch('https://teleology.foundation/movies/theaters')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Unable to get theater info. ${response.statusText}`);
        }
        return response.json();
      })
      .catch(error => {
        setErrorMessage(error.message);
        throw error;
      });
  }

  function getTheaterKeysArray() {
    return getTheaterKeys()
      .then(data => {
       return  Promise.all(
          data.map(theater =>
            fetch(`https://teleology.foundation/movies/${theater.key}`)
              .then(response => response.json())
              .then(showtimes => ({ ...theater, showtimes: showtimes }))
          )
        );
      })
      .then(responses => {
        setTheaterData(responses);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }

  useEffect(() => {
    if(errorMessage === ""){

      getTheaterKeysArray()
    }
  }, [errorMessage]);



  useEffect(() => {
    getTheaterKeysArray()
  }, []);

  useEffect(() => {
    console.log('theaterData', theaterData);
  }, [theaterData]);

  const resetError = () => {
    setErrorMessage("")
  }

  return (
    <div>
      {theaterData.length === 0 && errorMessage ? (
        <ErrorComponent errorMessage={errorMessage} resetError={resetError} />
      ) : 
       (
        <main className='App'>
          <Routes>
            {theaterData.length === 0 ? (
               <Route
               path='/'element={<Loading/>} />
            ) : 
            errorMessage ? (
              <Route
              path='/'element={<ErrorComponent errorMessage={errorMessage} resetError={resetError}/>} />
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
            )
          }
            <Route
              path='/favorites'
              element={
                <FavoritesPage
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
             <Route path='*' element={<ErrorComponent/>}/>
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
