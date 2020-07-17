import React from 'react';
import Input from './Input';
import '../style/ChangePassword.scss';

const ChangePassword = () => (
  <div className='changePassword'>
    <div className='changePassword_input'>
      <Input
        // input={this.props.confirmPassword}
        // inputChange={this.handleInputChange} 
        label='Old Password'
        name='oldPassword'
        type="password"
        required
      />
    </div>
    <div className='changePassword_input'>
      <Input
        // input={this.props.confirmPassword}
        // inputChange={this.handleInputChange} 
        label='New Password'
        name='newPassword'
        type="password"
        required
      />
    </div>
    <div className='changePassword_input'>
      <Input
        // input={this.props.confirmPassword}
        // inputChange={this.handleInputChange} 
        label='Confirm New Password'
        name='confirmPassword'
        type="password"
        required
      />
    </div>
</div>
);

export default ChangePassword;
