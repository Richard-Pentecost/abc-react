import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderSection from './HeaderSection';
import Input from './Input';
import * as actions from '../store/actions';
import '../style/Profile.scss';

class Profile extends Component {
  state = {
    passwordFormVisible: false,
  };

  handleClick = () => {
    this.setState({ passwordFormVisible: !this.state.passwordFormVisible });
  };

  render() {

    console.log(this.props.user);
    const { name, username, email, } = this.props.user;
    let btnText;
    this.state.passwordFormVisible ? btnText = 'Hide Password Section' : btnText = 'Change Password';
    return (
       <div className='profile'>
        <HeaderSection>Profile Settings</HeaderSection>
        <div className='profileSection'>
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
          <div className='passwordSection_input'>
            <Input
              input={this.props.confirmPassword}
              inputChange={this.handleInputChange} 
              label='Confirm Password'
              name='confirmPassword'
              type="password"
              required
            />
          </div>
          <div className='passwordSection_input'>
            <Input
              input={this.props.confirmPassword}
              inputChange={this.handleInputChange} 
              label='Confirm Password'
              name='confirmPassword'
              type="password"
              required
            />
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitUsers: () => dispatch(actions.initUsers()),
//   };
// };


export default connect(mapStateToProps)(Profile);
