import React from 'react'
import heartFilled from '../../images/heartFilled.png'
import './Card.css'
function Card() {
  return (
    <div className='card'>
      <button className='favorites-btn'>
        <img src={heartFilled} alt='heart outline' className='favorites-img'></img>
      </button>
    </div>
  )
}

export default Card
