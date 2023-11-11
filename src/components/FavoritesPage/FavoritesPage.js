import React from 'react'
import './FavoritesPage.css'
import {Link} from 'react-router-dom'

function FavoritesPage() {
  return (
    <div className='favorited-page'>
      <h1 className='page-title'>favorited</h1>
      <div className='favorited-container'>
        <Link to='/'>
        <button className='nav-btn'>back to home</button>
        </Link>
      </div>
    </div>
  )
}

export default FavoritesPage
