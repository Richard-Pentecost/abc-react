import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminRoute from './AdminRoute';
import ProfileSideBar from './ProfileSideBar';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import CreateUser from './CreateUser';
import Users from './Users';
import Spinner from './Spinner';
import FarmList from './FarmList';
import * as actions from '../store/actions';
import '../style/ProfilePage.scss';

class ProfilePage extends Component {

  componentDidMount() {
    this.props.onFetchUser(this.props.id);
    this.props.onInitUsers();
    this.props.onInitFarms();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user && prevProps.user) {
      this.props.onInitUsers();
      this.props.onInitFarms();
    };
  };

  render() {
    const { path } = this.props.match;
    let content = <Spinner />;
    if (!this.props.loading && this.props.user) {
      const { user, isAdmin } = this.props;
      content = (
        <>
          <div className='profilePage__sidebar'>
              <ProfileSideBar
                isAdmin={isAdmin} 
                name={user.name} 
              />
          </div>
          <div className='profilePage__section'>
              <Switch>
                <Route path={`${path}/profile`} component={Profile} />
                <Route path={`${path}/security`} component={ChangePassword} />
                <AdminRoute path={`${path}/create-user`} component={CreateUser} isAdmin={isAdmin} />
                <AdminRoute path={`${path}/users`} component={Users} isAdmin={isAdmin} />
                <AdminRoute path={`${path}/farms`} component={FarmList} isAdmin={isAdmin} />
                <Redirect to={`${path}/profile`} />
              </Switch>
          </div> 
        </>
      );
    }

    return (
       <div className='profilePage'>
        {content}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    id: state.auth.token.id,
    isAdmin: state.auth.token.permissionLevel === 'admin',
    user: state.users.currentUser,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitUsers: () => dispatch(actions.initUsers()),
    onFetchUser: id => dispatch(actions.fetchUser(id)),
    onInitFarms: () => dispatch(actions.initFarms()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
