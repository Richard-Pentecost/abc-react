import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import HeaderSection from './HeaderSection';
import Button from './Button';
import Alert from './Alert';
import * as actions from '../store/actions';
import '../style/ChangePassword.scss';

class ChangePassword extends Component {

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

  handleInputChange = event => {
    const { name, value } = event.target;
    if (this.props.error) {
      this.props.onClearError();
    };
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
  };

  render () {
    let errorAlert = null;
    if (this.props.error) {
      errorAlert = <Alert message={this.props.errorMessage} />;
    };

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
              <Button text='Change Password' loading={this.props.showSpinner} />
            </div>
          </form>
          {errorAlert}
        </div>
      </>
    )
  }
  
}

const mapStateToProps = state => {
  const { oldPassword, password, confirmPassword} = state.userForm;
  const { currentUser, showSpinner, error, errorMessage, addUserSuccess } = state.users;
  return { 
    oldPassword, password, confirmPassword, 
    showSpinner, error, errorMessage, addUserSuccess,
    user: currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.userUpdate({ prop: name, value })),
    onUpdatePassword: data => dispatch(actions.changePassword(data)),
    onClearSuccessFlag: () => dispatch(actions.clearUserSuccessFlag()),
    onClearForm: () => dispatch(actions.clearUserForm()),
    onClearError: () => dispatch(actions.clearUserErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
