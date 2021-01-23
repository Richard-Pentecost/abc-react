import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import Modal from './Modal';
import List from './List';
import HeaderSection from './HeaderSection';
import * as actions from '../store/actions';
import '../style/Users.scss';

class FarmList extends Component {
  state = {
    userId: '',
    tableHeadings: ['Farm', ''],
  };

  render() {
    const { farms, isAdmin } = this.props;
    const formattedFarmsArray = farms.map(farm => {
      return  {
        '_id': farm._id,
        'farmName': farm.farmName
      };
    });

    let farmList = null;
    if (farms) {
      farmList = <List
        farms={formattedFarmsArray} 
      /> 
    }

    return (
      <>
        <HeaderSection>Farms</HeaderSection>
        <div className='users'>
          {farmList}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    farms: state.farms.farms,
    isAdmin: state.auth.token.permissionLevel === 'admin',
  };
};


export default connect(mapStateToProps)(FarmList);
