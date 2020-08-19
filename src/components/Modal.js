import React from 'react';
import AppButton from './AppButton';
import '../style/Modal.scss';

const Modal = ({ displayText, deleteHandler, cancelHandler }) => {
  return (
    <div className='modal'>
      <div className='modal__form'>
        <div className='modal__text'>
          {displayText}
        </div>
        <div className='modal__btn'>
          <AppButton 
            handleClick={deleteHandler} 
            text='Continue'
          />
          <AppButton 
            handleClick={cancelHandler} 
            text='Cancel'
            classes='medium red'
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;