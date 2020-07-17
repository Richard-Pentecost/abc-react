import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/ProfileSideBar.scss';

const ProfileSideBar = props => (
  <div className='profileSideBar'>
    <div className='profileSideBarHeading'>
      <span className='profileSideBarHeading__nameText'>{props.name}</span>
      <span className='profileSideBarHeading__text'>Profile Settings</span>
    </div>
    <div className='profileSideBarLink'>
      <NavLink 
        to={{
          pathname: '/settings/profile',
          aboutProp: { title: 'Profile' }
        }}
        className='profileSideBarLink__link'
      >Profile</NavLink>
    </div>
    <div className='profileSideBarLink'>
      <NavLink 
        to={{
          pathname: '/settings/security',
          aboutProp: { title: 'Change Password' },
        }}
        className='profileSideBarLink__link'
      >Change Password</NavLink>
    </div>
    <div className='profileSideBarLink'>
      <NavLink 
        to={{
          pathname: '/settings/create-user',
          aboutProp: { title: 'Create User' },
        }}
        className='profileSideBarLink__link'
      >Create User</NavLink>
    </div>
    <div className='profileSideBarLink'>
      <NavLink 
        to={{
          pathname: '/settings/users',
          aboutProp: { title: 'Users' },
        }}
        className='profileSideBarLink__link'
      >Users</NavLink>
    </div>
  </div>
)

export default ProfileSideBar;
