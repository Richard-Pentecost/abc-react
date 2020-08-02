import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderSection from './HeaderSection';
import Input from './Input';
import Button from './Button';
import Alert from './Alert';
import * as actions from '../store/actions';
import '../style/CreateUser.scss';

class CreateUser extends Component {

  componentWillUnmount() {
    this.props.onClearForm();
    this.props.onClearError();
    this.props.onClearSuccessFlag();
  };

  componentDidUpdate() {
    if (this.props.addUserSuccess) {
      this.props.history.replace('/');
    };  
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, username, password, confirmPassword, permissionLevel } = this.props;
    this.props.onCreateUser({ name, email, username, password, confirmPassword, permissionLevel });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.props.onClearError();
    this.props.onInputChange({ name, value });
  }

  render() { 
    let errorAlert = null;
    if (this.props.error) {
      errorAlert = <Alert message={this.props.errorMessage} />;
    };

    return (
      <>
        <HeaderSection>Create User</HeaderSection>
        <div className='createUser'>
          <form onSubmit={this.handleSubmit}>
            <Input
              input={this.props.name}
              inputChange={this.handleInputChange} 
              label='Name'
              name='name'
              type="text"
              required
            />
            <Input
              input={this.props.email}
              inputChange={this.handleInputChange} 
              label='Email'
              name='email'
              type="email"
              required
            />
            <Input
              input={this.props.username}
              inputChange={this.handleInputChange} 
              label='Username'
              name='username'
              type="text"
              required
            />
            <Input
              input={this.props.password}
              inputChange={this.handleInputChange} 
              label='Password'
              name='password'
              type="password"
              required
            />
            <Input
              input={this.props.confirmPassword}
              inputChange={this.handleInputChange} 
              label='Confirm Password'
              name='confirmPassword'
              type="password"
              required
            />
            <div className='radioBtn'>
              <div className='radioBtn__btn'>
                <label className='radioBtn__text'>User</label>
                <input 
                  className='radioBtn__input'
                  type='radio' 
                  value='user'
                  name='permissionLevel' 
                  checked={this.props.permissionLevel === 'user'} 
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='radioBtn__btn'>
                <label className='radioBtn__text'>Admin</label>
                <input 
                  className='radioBtn__input'
                  type='radio' 
                  value='admin'
                  name='permissionLevel' 
                  checked={this.props.permissionLevel === 'admin'} 
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className='createUser__btn'>
              <Button text='Create User' loading={this.props.showSpinner} />
            </div>
          </form>
          {errorAlert}
        </div>
      </>
    )
  };
};

const mapStateToProps = state => {
  const { name, email, username, password, confirmPassword, permissionLevel } = state.userForm;
  const { showSpinner, error, errorMessage, addUserSuccess } = state.users;
  return { 
    name, email, username, password, confirmPassword, permissionLevel,
    showSpinner, error, errorMessage, addUserSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.userUpdate({ prop: name, value })),
    onCreateUser: ({ name , email, username, password, confirmPassword, permissionLevel }) => {
      dispatch(actions.createUser({ name, email, username, password, confirmPassword, permissionLevel }));
    },
    onClearSuccessFlag: () => dispatch(actions.clearUserSuccessFlag()),
    onClearForm: () => dispatch(actions.clearUserForm()),
    onClearError: () => dispatch(actions.clearUserErrorMessage()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
