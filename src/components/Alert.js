import React from 'react';
import '../style/Alert.scss';

const Alert = ({ message }) => {

  return (
    <div className='alert'>{message}</div>
  );
};

export default Alert