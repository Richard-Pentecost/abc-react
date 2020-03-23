import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import '../style/Login.css';
import tokenManager from '../utils/token-manager';

const URL = 'http://localhost:3000/login';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
  };

  handleLogin = async (event) => {
    event.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({ errorMessage: 'Email and password required' });
    } else {
      const { email, password } = this.state;
      try {
        const res = await axios.post(URL, { email, password });
        tokenManager.setToken(res.data.token);
        this.props.onLogin();
        this.props.history.push('/home');
      } catch (err) {
        this.setState({ errorMessage: err.response.data.error });
      }
    }
  };

  handleInputChange = (event) => {
    if (this.state.errorMessage) {
      this.setState({ errorMessage: '' });
    }
    const { name, value } = event.target;
    this.setState({ [name] : value });
  }

  render() {
    const { email, password, errorMessage } = this.state;
    let error;

    if (errorMessage) {
      error = (
        <div className='error'>{errorMessage}</div>
      );
    } else {
      error = null;
    }

    return (
      <div className='form'>
        <form onSubmit={this.handleLogin}>
          <Input
            input={email}
            inputChange={this.handleInputChange} 
            label='Email'
            name='email'
            type="email"
            required
          />
          <Input
            input={password}
            inputChange={this.handleInputChange}
            label='Password'
            name='password'
            type='password'
            required
          />
          <Button text='Login' /> 
          {error}
        </form>
      </div>
    )
  }
}

export default Login;
