import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
    const handleTheaterSelection = () => {

    }
  return (
    <nav>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>Academy Museum</p>
      </button>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>2220 Arts + Archives</p>
      </button>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>Aero Theatre - American Cinematheque</p>
      </button>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>Alamo Drafthouse Cinema</p>
      </button>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>Billy Wilder Theater</p>
      </button>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>Brain Dead Studios</p>
      </button>
      <button onClick={handleTheaterSelection } className='theater-btn'>
        <p>Los Feliz 3 Theatre - American Cinematheque</p>
      </button>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>Vidiots</p>
      </button>
      <button onClick={handleTheaterSelection} className='theater-btn'>
        <p>WHAMMY!</p>
      </button>

    </nav>
  );
}

export default NavBar;
