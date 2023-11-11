import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h1 className='header-title'></h1>
      <Link to="https://teleology.foundation/moviedata" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'inherit'}}>
      <p>about the data</p>
      </Link>
    </header>
  )
}

export default Header
