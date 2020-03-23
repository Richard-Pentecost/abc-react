import React from 'react';
import '../style/Button.css';

const Button = ({ text }) => {
  return <button type='submit' className='btn'>{text}</button>
}

export default Button ;
