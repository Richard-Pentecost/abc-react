import React from 'react';
import { Link } from 'react-router-dom';
import abcLogo from '../abcLogo.png';
import '../style/NavBar.css';

const NavBar = ({ authenticate, onLogout }) => {
  
  const links = (
    <div className='links'>
        <ul className='links_list'>
          <li className='links_list-item'>
            <Link to='/add-farm'>Add Farm</Link>
          </li>
          <li className='links_list-item'>
            <Link 
              to='/'
              onClick={onLogout}
            >Logout</Link>
          </li>
        </ul>
      </div>
  );

  return (
    <div className='navbar'>
      <div className='title'>
        <Link to='/home'><img src={abcLogo} alt='logo' /></Link>
      </div>
      {authenticate() ? links : null }
    </div>
  );
}

export default NavBar;