import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import Button from './Button';
import Alert from './Alert';
import * as actions from '../store/actions';
import '../style/Login.scss';

class Login extends Component {

  onLoginUser = (event) => {
    event.preventDefault();
    const { email, password } = this.props;
    this.props.handleLoginUser(email, password);
    this.props.history.push('/home');
  };

  onEmailChange = event => {
    const { value } = event.target;
    this.props.handleEmailChange(value);
  };

  onPasswordChange = event => {
    const { value } = event.target;
    this.props.handlePasswordChange(value);
  };

  render() {
    const { email, password, errorMessage } = this.props;

    let error;

    if (errorMessage) {
      error = (
        // <div className='error'>{errorMessage}</div>
        <Alert message={errorMessage}/>
      );
    } else {
      error = null;
    }
    
    return (
      <div className='form'>
        <form onSubmit={this.onLoginUser}>
          <Input
            input={email}
            inputChange={this.onEmailChange} 
            label='Email'
            name='email'
            type="text"
            required
          />
          <Input
            input={password}
            inputChange={this.onPasswordChange}
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

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    errorMessage: state.auth.errorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleEmailChange: text => dispatch(actions.emailChanged(text)),
    handlePasswordChange: text => dispatch(actions.passwordChanged(text)),
    handleLoginUser: (email, password) => dispatch(actions.loginUser({ email, password })),
  };
};
// export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
