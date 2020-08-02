import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/Button.scss';

const Button = ({ text, disabled, loading }) => {
  let displayText = text
  if (loading) {
    displayText = (
      <div className='btn__loading'>
        <FontAwesomeIcon icon={'spinner'} spin />
      </div>
    )
  }
  return (
   <button type='submit' className='btn' disabled={loading || disabled}>
     {displayText}
    </button>
  );
}

export default Button ;
