import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import HeaderSection from './HeaderSection';
import Button from './Button';
import * as actions from '../store/actions';
import '../style/ChangePassword.scss';

class ChangePassword extends Component {

  componentWillUnmount() {
    this.props.onClearForm();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.props.onInputChange({ name, value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = { 
      oldPassword: this.props.oldPassword,
      newPassword: this.props.password,
      confirmNewPassword: this.props.confirmPassword,
      id: this.props.user.id,
    };
    this.props.onUpdatePassword(data);
    this.props.history.replace('/');
  };

  render () {
    return (
      <>
        <HeaderSection>Change Password</HeaderSection>
        <div className='changePassword'>
          <form onSubmit={this.handleSubmit}>
            <div className='changePassword_inputs'>
              <Input
                input={this.props.oldPassword}
                inputChange={this.handleInputChange} 
                label='Old Password'
                name='oldPassword'
                type="password"
                required
              />
              <Input
                input={this.props.password}
                inputChange={this.handleInputChange} 
                label='New Password'
                name='password'
                type="password"
                required
              />
              <Input
                input={this.props.confirmPassword}
                inputChange={this.handleInputChange} 
                label='Confirm New Password'
                name='confirmPassword'
                type="password"
                required
              />
            </div>
            <div className='changePassword__btn'>
              <Button text='Change Password' />
            </div>
          </form>
        </div>
      </>
    )
  }
  
}

const mapStateToProps = state => {
  const { oldPassword, password, confirmPassword} = state.userForm;
  return { 
    user: state.users.currentUser,
    oldPassword, password, confirmPassword, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.userUpdate({ prop: name, value })),
    onUpdatePassword: data => dispatch(actions.changePassword(data)),
    onClearForm: () => dispatch(actions.clearUserForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
