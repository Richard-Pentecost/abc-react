import React from 'react';
import { Link } from 'react-router-dom';
import abcLogo from '../abcLogo.png';
import '../style/NavBar.scss';

const NavBar = ({ authenticate, onLogout }) => {
  
  const links = (
    <div className='navbar__links'>
      <Link 
        to='/'
        onClick={onLogout}
        className='link'
      >Logout</Link>
    </div>
  );

  return (
    <div className='navbar'>
      <div className='navbar__title'>
        <Link to='/home' className='link'>ABC</Link>
      </div>
      {authenticate() ? links : null }
    </div>
  );
}

export default NavBar;

// <img src={abcLogo} alt='logo' />