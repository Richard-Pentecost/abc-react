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
      <NavLink to='/settings/profile' className='profileSideBarLink__link'>
        <span className='profileSideBarLink__text'>Profile</span>
      </NavLink>
    </div>
    <div className='profileSideBarLink'>
      <NavLink to='/settings/security' className='profileSideBarLink__link'>
        <span className='profileSideBarLink__text'>Change Password</span>
      </NavLink>
    </div>
    { props.isAdmin ?
      (
        <>
          <div className='profileSideBarLink'>
            <NavLink to='/settings/create-user' className='profileSideBarLink__link'>
              <span className='profileSideBarLink__text'>Create User</span>
            </NavLink>
          </div>
          <div className='profileSideBarLink'>
            <NavLink to= '/settings/users' className='profileSideBarLink__link'>
              <span className='profileSideBarLink__text'>Users</span>
            </NavLink>
          </div>
          <div className='profileSideBarLink'>
            <NavLink to= '/settings/farms' className='profileSideBarLink__link'>
              <span className='profileSideBarLink__text'>Farms</span>
            </NavLink>
          </div>
        </>
      ) : null
    }
  </div>
)

export default ProfileSideBar;
