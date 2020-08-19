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
import ProfilePage from './ProfilePage';
import { logoutUser } from '../store/actions';
import TokenManager from '../utils/token-manager';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhoneSquare, faPlus, faSearch, faCaretDown, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard, faEdit, faTrashAlt, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import '../style/App.scss';

library.add(faAddressCard, faUser, faPhoneSquare, faEdit, faPlus, faSearch, faTrashAlt, faCalendarAlt, faCaretDown, faSpinner);

class App extends Component {

  isLoggedIn = () => {
    return Boolean(this.props.token) && TokenManager.isTokenValid();
  }

  render() {
    return (
      <div className="App">
        <NavBar 
          authenticate={this.isLoggedIn}
          onLogout={this.props.logoutUser}
          token={this.props.token}
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
            path="/farms/:id/edit-data/:dataId"
            component={EditData}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            path="/settings"
            component={ProfilePage}
            authenticate={this.isLoggedIn}
          />
          <Redirect to ='/home' />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { logoutUser })(App);
