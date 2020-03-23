import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/FarmCard.css';

const FarmCard = ({ farm, clickHandler }) => {
  return (
    <div className='farmCard' onClick={clickHandler}>
      <div className='farmName'>
        {farm.farmName}
      </div>
      <div className='farmInfo'>
        <div className="farmInfo-item">
          <span><FontAwesomeIcon icon={[ 'far', 'address-card' ]} /></span>
          <span className="farmInfo-item_text">{farm.postcode}</span>
        </div>
        <div className="farmInfo-item">
          <span><FontAwesomeIcon icon={'user'} /></span>
          <span className="farmInfo-item_text">{farm.contactName}</span>
        </div>
        <div className="farmInfo-item">
          <span ><FontAwesomeIcon icon={'phone-square'} /></span>
          <span className="farmInfo-item_text">{farm.contactNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default FarmCard;
