import React from 'react';
import { Link } from 'react-router-dom';
import '../style/DropDown.scss';

const DropDown = ({ hideDropDown, onLogout }) => {
  return (
    <div className='dropdown'>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link to='/' className='dropdown__link'>Home</Link>
      </div>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link to='/settings' className='dropdown__link'>Profile</Link>
      </div>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link 
          to={{ pathname: '/settings/create-user', aboutProp: { title: 'Create User' } }}
          className='dropdown__link'
        >Create User</Link>
      </div>
      <div className='dropdown__item' onClick={hideDropDown}>
        <Link 
          to={{ pathname: '/settings/users', aboutProp: { title: 'Users' } }} 
          className='dropdown__link'
        >Users</Link>
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
