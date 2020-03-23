import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import '../style/Farm.css';

const URL = 'http://localhost:3000/farms';

class Farm extends Component{
  state = {
    loadedFarm: null,
  };
  
  async componentDidMount() {
    console.log(this.props);
    const id = this.props.match.params.id;
    try {
      const response = await axios.get(`${URL}/${id}`);
      this.setState({ loadedFarm: response.data })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { loadedFarm } = this.state;
    let farm = <Spinner />;
    if (loadedFarm) {
      farm = (
        <>
          <div>{loadedFarm.farmName}</div>
          <Link to={`${loadedFarm._id}/edit`}>Edit Farm Details</Link>
        </>
      );
    }
    console.log(loadedFarm);
    return (
      <div>
        {farm}
      </div>
    )
  }
}

export default Farm;