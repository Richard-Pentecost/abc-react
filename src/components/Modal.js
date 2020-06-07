import React from 'react';
import AppButton from './AppButton';
import '../style/Modal.css';

const Modal = ({ displayText, deleteHandler, cancelHandler }) => {
  return (
    <div className='modal-container'>
      <div className='modalForm-container'>
        <div className='modalForm-text'>
          {displayText}
        </div>
        <div className='modalForm-btnContainer'>
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