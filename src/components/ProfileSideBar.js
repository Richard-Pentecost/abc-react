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
      <NavLink to='/settings/profile' className='profileSideBarLink__link'>Profile</NavLink>
    </div>
    <div className='profileSideBarLink'>
      <NavLink to='/settings/security' className='profileSideBarLink__link'>Change Password</NavLink>
    </div>
    { props.isAdmin ?
      (
        <>
          <div className='profileSideBarLink'>
            <NavLink to='/settings/create-user' className='profileSideBarLink__link'>Create User</NavLink>
          </div>
          <div className='profileSideBarLink'>
            <NavLink to= '/settings/users' className='profileSideBarLink__link'>Users</NavLink>
          </div>
        </>
      ) : null
    }
  </div>
)

export default ProfileSideBar;
