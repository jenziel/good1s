import React from "react";
import "./FavoritesPage.css";
import { Link } from "react-router-dom";
import emptyBurst from "../../images/emptyBurst.png";
import PropTypes from 'prop-types'

function FavoritesPage({ favorites, setFavorites }) {
  return (
    <div className='favorited-page'>
      <h1 className='page-title fav-title'>Favorited</h1>
      <Link to='/'>
        <button className='favorites-nav-btn nav-btn'>back to home</button>
      </Link>
      <div className='favorited-container'>
        <div className='favorited-empty'>
          <img src={emptyBurst} className='favorited-burst'></img>
          <p className='favorited-message'>No favorites yet.</p>
          <p className='favorited-message'>
            {" "}
            When you save a movie it will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;

FavoritesPage.propTypes = {
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
};