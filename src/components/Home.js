import React, { Component } from 'react';
import '../style/Home.css';
import FarmCard from './FarmCard';
import SideBar from './SideBar';
import axios from 'axios';

const URL = 'http://localhost:3000/farms';

class Home extends Component {
  state = {
    farms: '',
  };

  async componentDidMount() {
    try {
      const response = await axios.get(URL);
      this.setState({
        farms: response.data,
      })
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = (id) => {
    this.props.history.push(`/farm/${id}`);
  }

  render() {
    const { farms } = this.state;
    let farmList = '';
    if (farms) {
      farmList = farms.map(farm => {
        return (
          <FarmCard key={farm.farmName} farm={farm} clickHandler={() => this.handleClick(farm._id)} />
        );
      });
    } 
    return (
      <div className='homePage'>
        <div className='sidebar'>
          <SideBar />
        </div>
        <div className='farmList'>
          {farmList}
        </div>
      </div>
    );
  };
};

export default Home;
