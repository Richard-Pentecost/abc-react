import React from 'react';
import { Link } from 'react-router-dom';
import '../style/DropDown.scss';

const DropDown = ({ hideDropDown, onLogout }) => {
  return (
    <div className='dropdown'>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link to='/profile' className='dropdown__link'>Profile</Link>
      </div>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link to='/create-user' className='dropdown__link'>Create User</Link>
      </div>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link to='/users' className='dropdown__link'>Users</Link>
      </div>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link 
          to='/'
          onClick={onLogout}
          className='dropdown__link'
        >Logout</Link>
      </div>

    </div>
  );
};

export default DropDown;
