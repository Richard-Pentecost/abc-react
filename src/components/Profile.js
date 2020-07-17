import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import Button from './Button';
import * as actions from '../store/actions';

import '../style/Profile.scss';


class Profile extends Component {

  handleInputChange = event => {
    const { name, value } = event.target;
    this.props.onInputChange({ name, value });
  };

  render() {
    console.log(this.props.user);
    const { name, username, email } = this.props.user;
    return (
      <div className='profile'>
        <form onSubmit={this.handleSubmit}>
          <div className='profile__inputs'>
            <Input 
              input={name}
              inputChange={this.handleInputChange}
              label='Name'
              name='name'
              type='text'
            />
            <Input 
              input={username}
              inputChange={this.handleInputChange}
              label='Username'
              name='username'
              type='text'
            />
            <Input 
              input={email}
              inputChange={this.handleInputChange}
              label='Email'
              name='email'
              type='email'
            />
          </div>
          <div className='profile__btn'>
            <Button text='Update Profile' />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.userUpdate({ prop: name, value })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

 {/* <div className='profileSection'>
            <span>Name: </span>
            <span>{name}</span>
          </div>
          <div className='profileSection'>
            <span>Username: </span>
            <span>{username}</span>
          </div>
          <div className='profileSection'>
            <span>Email: </span>
            <span>{email}</span>
          </div>
          <div className='profileBtn'>
            <span className='profileBtn__link' onClick={this.handleClick}>
              {btnText}
            </span>
          </div>
          <div className='passwordSection'>
            {passwordForm}
          </div> */}