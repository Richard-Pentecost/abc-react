import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/AppButton.css';

const AppButton = ({ handleClick, text, icon, classes }) => {
  let additionalClass;
  switch (classes) {
    case 'small red':
      additionalClass = 'appBtn-small appBtn-red';
      break;
    case 'medium red':
      additionalClass = 'appBtn-medium appBtn-red';
      break;
    default:
      additionalClass = 'appBtn-medium appBtn-green';
  };
  
  return (
    <div className={`appBtn ${additionalClass}`} onClick={handleClick}>
      { icon ? 
        <span className='appBtn-icon'><FontAwesomeIcon icon={icon}/></span>
        : null
      }
      <span className='appBtn-text'>{text}</span>
    </div>
  );
}; 

export default AppButton;
