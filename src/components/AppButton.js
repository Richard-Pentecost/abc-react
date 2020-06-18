import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/AppButton.scss';

const AppButton = ({ handleClick, text, icon, classes, hide }) => {
  let additionalClass;
  switch (classes) {
    case 'small red':
      additionalClass = 'appBtn__small appBtn__red';
      break;
    case 'medium red':
      additionalClass = 'appBtn__medium appBtn__red';
      break;
    default:
      additionalClass = 'appBtn__medium appBtn__green';
  };
  
  let hideClass = '';
  if (hide) {
    hideClass = 'appBtn__hide';
  }
  return (
    <div className={`appBtn ${additionalClass}`} onClick={handleClick}>
      { icon ? 
        <span className='appBtn__icon'><FontAwesomeIcon icon={icon}/></span>
        : null
      }
      <span className={`appBtn__text ${hideClass}`}>{text}</span>
    </div>
  );
}; 

export default AppButton;
