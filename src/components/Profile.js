import React, { Component } from 'react';
import HeaderSection from './HeaderSection';
import '../style/Profile.scss';

class Profile extends Component {


  render() {
    return (
       <div className='profile'>
        <HeaderSection>Profile Settings</HeaderSection>
      </div>
    )
  }
}


export default Profile;
