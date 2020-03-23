import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import TokenManager from '../utils/token-manager';
import '../style/AddFarm.css';

const URL = 'http://localhost:3000/farms';

class AddFarm extends Component {
  state = {
    farmName: '',
    postcode: '',
    contactName: '',
    contactNumber: '',
  };
  

  handleAddFarm = async (event) => {
    event.preventDefault();
    try {
      const { farmName, postcode, contactName, contactNumber } = this.state;
      const postData = { farmName, postcode, contactName, contactNumber };
      const axiosHeaders = { headers: { Authorization: TokenManager.getToken() }};

      await axios.post(URL, postData, axiosHeaders);
      this.props.history.push('/home');
    } catch (err) {
      console.log(err.response);
    };
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name] : value });
  };

  render() {
    const { farmName, postcode, contactName, contactNumber } = this.state;
    console.log(this.props);
    return (
      <div className='addFarm'>
        <form onSubmit={this.handleAddFarm}>
          <Input
            input={farmName}
            inputChange={this.handleInputChange} 
            label='Farm Name'
            name='farmName'
            type="text"
            required
          />
          <Input
            input={postcode}
            inputChange={this.handleInputChange} 
            label='Postcode'
            name='postcode'
            type="text"
            required
          />
          <Input
            input={contactName}
            inputChange={this.handleInputChange} 
            label='Contact Name'
            name='contactName'
            type="text"
            required
          />
          <Input
            input={contactNumber}
            inputChange={this.handleInputChange} 
            label='Contact Number'
            name='contactNumber'
            type="text"
            required
          />
          <Button text='Add Farm'/>
        </form>
      </div>
    );
  };
};

export default AddFarm;