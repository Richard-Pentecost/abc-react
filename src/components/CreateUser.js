import React, { Component } from 'react';
import HeaderSection from './HeaderSection';
import Input from './Input';
import Button from './Button';
import '../style/CreateUser.scss';

class CreateUser extends Component {
  state = {
    nameInput: '',
    emailInput: '',
    passwordInput: '',
    confirmPasswordInput: '',
    selectedOption: 'user',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit');
  };

  render() { 
    const { 
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      selectedOption,
    } = this.state;

    return (
      <div className='createUser'>
        <HeaderSection>Create User</HeaderSection>
        <div className='createUser__form'>
          <form onSubmit={this.handleSubmit}>
            <Input
              input={nameInput}
              inputChange={this.handleInputChange} 
              label='Name'
              name='nameInput'
              type="text"
              required
            />
            <Input
              input={emailInput}
              inputChange={this.handleInputChange} 
              label='Email'
              name='emailInput'
              type="email"
              required
            />
            <Input
              input={passwordInput}
              inputChange={this.handleInputChange} 
              label='Password'
              name='passwordInput'
              type="password"
              required
            />
            <Input
              input={confirmPasswordInput}
              inputChange={this.handleInputChange} 
              label='Confirm Password'
              name='confirmPasswordInput'
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
                  name='selectedOption' 
                  checked={selectedOption === 'user'} 
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='radioBtn__btn'>
                <label className='radioBtn__text'>Admin</label>
                <input 
                  className='radioBtn__input'
                  type='radio' 
                  value='admin'
                  name='selectedOption' 
                  checked={selectedOption === 'admin'} 
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className='createUser__btn'>
              <Button text='Create User' />
            </div>
           
          </form>
        </div>
      </div>
    )
  };
  }

export default CreateUser;
