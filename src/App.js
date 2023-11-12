import { useEffect, useState } from "react";
import "./App.css";
import { getTheaterKeys} from "./apiCalls";
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

 function getTheaterKeys(){
    return fetch('https://teleology.foundation/movies/theaters')
    .then(response =>{
        if(!response.ok){
            throw new Error(`Unable to get theater info.`)
        }
       else {
        return  response.json()
       }
    })
    .catch((error) => {
      
      setErrorMessage(error);
      throw error;
    }
    )
}

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
      .catch(response => {
        console.log('response', response)
        return setErrorMessage(response)
      })
    });
  }


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
