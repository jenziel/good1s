import React from "react";
import "./ErrorComponent.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function ErrorComponent({errorMessage, resetError}) {
  return (
    <div className='error-page'>
      {
        errorMessage ? (
          <h1 className='page-title error-title'>{errorMessage}</h1>
        ) : (

          <h1 className='page-title error-title'>Woops! Page not found.</h1>
        )
      }
      <Link to='/'>
        <button onClick={resetError} className='nav-btn'>back to home</button>
      </Link>
    </div>
  );
}

export default ErrorComponent;
ErrorComponent.propTypes = {
    errorMessage: PropTypes.string,
    resetError: PropTypes.func
  };