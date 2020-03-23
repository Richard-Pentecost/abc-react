import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import Home from './Home';
import AddFarm from './AddFarm';
import Farm from './Farm';
import AuthRoute from './AuthRoute';
import TokenManager from '../utils/token-manager';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import '../style/App.css';

library.add(faAddressCard, faUser, faPhoneSquare);

class App extends Component {
  state = {
    user: TokenManager.isTokenValid() ? TokenManager.getTokenPayload() : null
  };

  onLogin = () => {
    this.setState({
      user: TokenManager.getTokenPayload(),
    });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({
      user: null,
    });
  };

  isLoggedIn = () => {
    return Boolean(this.state.user) && TokenManager.isTokenValid();
  }

  render() {
    return (
      <div className="App">
        <NavBar 
          authenticate={this.isLoggedIn}
          onLogout={this.handleLogout}
        />
        <Switch>
          <Route 
            exact
            path="/"
            render={props => (this.state.user ?
              <Redirect to='/home' /> :
              <Login {...props} onLogin={this.onLogin}/>
            )}
          />
          <AuthRoute
            exact
            path="/home"
            user={this.state.user}
            component={Home}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/add-farm"
            user={this.state.user}
            component={AddFarm}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/farm/:id"
            user={this.state.user}
            component={Farm}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute 
            exact
            path="/farm/:id/edit"
            user={this.state.user}
            component={AddFarm}
            authenticate={this.isLoggedIn}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
