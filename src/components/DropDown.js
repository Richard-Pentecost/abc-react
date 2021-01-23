import React from 'react';
import { Link } from 'react-router-dom';
import '../style/DropDown.scss';

const DropDown = ({ hideDropDown, onLogout, isAdmin }) => {
  return (
    <div className='dropdown'>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link to='/' className='dropdown__link'>Home</Link>
      </div>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link to='/settings' className='dropdown__link'>Profile</Link>
      </div>
      {
        isAdmin ?
        (
          <>
            <div className='dropdown__item' onClick={hideDropDown}>
              <Link to='/settings/create-user' className='dropdown__link'>Create User</Link>
            </div>
            <div className='dropdown__item' onClick={hideDropDown}>
              <Link to='/settings/users' className='dropdown__link'>Users</Link>
            </div>
            <div className='dropdown__item' onClick={hideDropDown}>
              <Link to='/settings/farms' className='dropdown__link'>Farms</Link>
            </div>
          </> 
        ) : null
      }
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
