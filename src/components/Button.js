import React from 'react';
import '../style/Button.scss';

const Button = ({ text }) => {
  return <button type='submit' className='btn'>{text}</button>
}

export default Button ;
