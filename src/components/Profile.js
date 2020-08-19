import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Input from './Input';
import Button from './Button';
import Alert from './Alert';
import HeaderSection from './HeaderSection';
import * as actions from '../store/actions';
import '../style/Profile.scss';


class Profile extends Component {
 
  componentDidMount() {
    _.each(this.props.user, (value, name) => {
      this.props.onInputChange({ name, value });
    });
  };

  componentWillUnmount() {
    this.props.onClearForm();
    this.props.onClearError();
    this.props.onClearSuccessFlag();
  }

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
      name: this.props.name,
      username: this.props.username,
      id: this.props.user.id,
    };
    this.props.onUpdateUser(data);
  };

  render() {
    let errorAlert = null;
    if (this.props.error) {
      errorAlert = <Alert message={this.props.errorMessage} />
    }
  
    return (
      <>
        <HeaderSection>Profile</HeaderSection>
        <div className='profile'>
          <form onSubmit={this.handleSubmit}>
            <div className='profile__inputs'>
              <Input 
                input={this.props.name}
                inputChange={this.handleInputChange}
                label='Name'
                name='name'
                type='text'
              />
              <Input 
                input={this.props.username}
                inputChange={this.handleInputChange}
                label='Username'
                name='username'
                type='text'
              />
              <Input
                disabled
                input={this.props.email}
                inputChange={this.handleInputChange}
                label='Email'
                name='email'
                type='email'
              />
            </div>
            <div className='profile__btn'>
              <Button text='Update Profile' loading={this.props.showSpinner} />
            </div>
          </form>
          {errorAlert}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { name, username, email } = state.userForm;
  const { currentUser, showSpinner, error, errorMessage, addUserSuccess } = state.users;
  return {
    name, username, email,
    showSpinner, error, errorMessage, addUserSuccess,
    user: currentUser, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.userUpdate({ prop: name, value })),
    onUpdateUser: data => dispatch(actions.editUser(data)),
    onClearSuccessFlag: () => dispatch(actions.clearUserSuccessFlag()),
    onClearForm: () => dispatch(actions.clearUserForm()),
    onClearError: () => dispatch(actions.clearUserErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
