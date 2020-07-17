import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderSection from './HeaderSection';
import ProfileSideBar from './ProfileSideBar';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import CreateUser from './CreateUser';
import Users from './Users';
// mport * as actions from '../store/actions';
import '../style/ProfilePage.scss';

class ProfilePage extends Component {


  render() {
    const { name } = this.props.user;
    const { path } = this.props.match;

    let title = 'Profile';
    if (this.props.location.aboutProp) {
      title = this.props.location.aboutProp.title;
    } 

    return (
       <div className='profilePage'>
         <div className='profilePage__sidebar'>
          <ProfileSideBar 
            name={name} 
          />
         </div>
         <div className='profilePage__section'>
          <HeaderSection>{title}</HeaderSection>

          <div className='profilePageSection'>
            <Switch>
              <Route path={`${path}/profile`} component={Profile} />
              <Route path={`${path}/security`} component={ChangePassword} />
              <Route path={`${path}/create-user`} component={CreateUser} />
              <Route path={`${path}/users`} component={Users} />
              <Redirect to={`${path}/profile`} />
            </Switch>
          </div>
         </div> 
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitUsers: () => dispatch(actions.initUsers()),
//   };
// };


export default connect(mapStateToProps)(ProfilePage);
