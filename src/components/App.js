import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Login from './Login';
import Home from './Home';
import AddFarm from './AddFarm';
import Farm from './Farm';
import EditFarm from './EditFarm';
import AuthRoute from './AuthRoute';
import AddData from './AddData';
import EditData from './EditData';
import Profile from './Profile';
import CreateUser from './CreateUser';
import Users from './Users';
import { logoutUser } from '../store/actions';
import TokenManager from '../utils/token-manager';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhoneSquare, faPlus, faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard, faEdit, faTrashAlt, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import '../style/App.scss';

library.add(faAddressCard, faUser, faPhoneSquare, faEdit, faPlus, faSearch, faTrashAlt, faCalendarAlt, faCaretDown);

class App extends Component {

  isLoggedIn = () => {
    return Boolean(this.props.user) && TokenManager.isTokenValid();
  }

  render() {
    return (
      <div className="App">
        <NavBar 
          authenticate={this.isLoggedIn}
          onLogout={this.props.logoutUser}
        />
        <Switch>
          <Route 
            exact
            path="/"
            render={props => (this.isLoggedIn() ?
              <Redirect to='/home' /> :
              <Login {...props} />
            )}
          />
          <AuthRoute
            exact
            path="/home"
            component={Home}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/add-farm"
            component={AddFarm}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/farms/:id"
            component={Farm}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/farms/:id/edit"
            component={EditFarm}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/farms/:id/add-data"
            component={AddData}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/farms/:id/:dataId"
            component={EditData}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/profile"
            component={Profile}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/users"
            component={Users}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/create-user"
            component={CreateUser}
            authenticate={this.isLoggedIn}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { logoutUser })(App);
