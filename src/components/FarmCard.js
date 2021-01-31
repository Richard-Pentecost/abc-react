import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/FarmCard.scss';

const FarmCard = ({ farm, clickHandler }) => {

  return (
    <div className='farmCard' onClick={clickHandler}>
      <div className='farmCard__main'>
      <div className='farmCard__header'>
        {farm.farmName}
      </div>
      <div className='farmCard__body'>
        <div className='farmCard__info'>
          <div className='farmCard__row'>
            <div className='farmCard__item'>
              <span><FontAwesomeIcon icon={[ 'far', 'address-card' ]} /></span>
              <span className="farmCard__text">{farm.postcode}</span>
            </div>
            <div className='farmCard__item'>
              <span><FontAwesomeIcon icon={'user'} /></span>
              <span className="farmCard__text">{farm.contactName}</span>
            </div>
            <div className='farmCard__item'>
              <span ><FontAwesomeIcon icon={'phone-square'} /></span>
              <span className="farmCard__text">{farm.contactNumber}</span>
            </div>
          </div>
          <div className='farmCard__col'>
            <div className='farmCard__item'>
              <span className='farmCard__label'>Last Visit:</span>
              <span className='farmCard__text'>{farm.data && farm.data.lastVisit ? moment(farm.data.lastVisit).format('ddd, DD-MMM-YYYY') : 'n/a'}</span>
            </div>
            <div className='farmCard__item'>
              <span className='farmCard__label'>Next Acid Delivery:</span>
              <span className='farmCard__text'>{farm.data && farm.data.acidDeliveryDate ? moment(farm.data.acidDeliveryDate).format('ddd, DD-MMM-YYYY') : 'n/a'}</span>
            </div>
            <div className='farmCard__item'>
              <span className='farmCard__label'>Next Chlorine Delivery:</span>
              <span className='farmCard__text'>{farm.data && farm.data.chlorineDeliveryDate ? moment(farm.data.chlorineDeliveryDate).format('ddd, DD-MMM-YYYY') : 'n/a' }</span>
            </div>
          </div>
          { 
            farm.comments ? (
              <div className='farmCard__item'>
                  <span className='farmCard__label'>Comments:</span>
                <span className='farmCard__text'>{farm.comments}</span>
              </div>
            ) : null
          }
        </div>
      </div>
      </div>
      <div className='farmCard__btnContainer'>
        <Link 
          to={{
            pathname: `farms/${farm._id}/edit`,
            state: { selectedFarm: farm },
          }}
          onClick={event => event.stopPropagation()}
          className='farmCard__link'
        >
          Edit Farm Details
        </Link>
      </div>
    </div>
  );
}

export default FarmCard;
