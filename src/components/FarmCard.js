import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from './AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/FarmCard.css';

const FarmCard = ({ farm, clickHandler, deleteHandler }) => {
  
  const onDelete = (event) => {
    event.stopPropagation();
    deleteHandler();
  };

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
      <div className='btn-container'>
        <Link 
          to={{
            pathname: `farms/${farm._id}/edit`,
            aboutProp: { selectedFarm: farm },
          }}
          onClick={event => event.stopPropagation()}
          className='link'
        >
          Edit Farm Details
        </Link>
        <AppButton 
          handleClick={event => onDelete(event)} 
          text='Delete'
          icon={[ 'far', 'trash-alt' ]}
          classes='small red'
        />
      </div>
    </div>
  );
}

export default FarmCard;
