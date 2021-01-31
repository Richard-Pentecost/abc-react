import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List';
import Modal from './Modal';
import HeaderSection from './HeaderSection';
import * as actions from '../store/actions';
import '../style/Users.scss';

class FarmList extends Component {
  state = {
    farm: {},
    tableHeadings: ['Farm', ''],
  };

  openModal = farm => this.setState({ showModal: true, farm: farm })

  hideModal = () => this.setState({ showModal: false, farm: {} });

  handleDisable = () => {
    const { farm } = this.state;
    this.setState({ showModal: false, farm: {} });
    const id = farm._id;
    const statusObj = { status: !farm.status };
    this.props.onUpdateFarm(statusObj, id)
  };

  render() {
    const { farms } = this.props;
    const formattedFarmsArray = farms.map(farm => {
      return  {
        '_id': farm._id,
        'status': farm.status,
        'farmName': farm.farmName
      };
    });

    let farmList = null;
    if (farms) {
      farmList = <List
        farms={formattedFarmsArray}
        btnClickHandler={this.openModal}
      /> 
    }

    let modal = null;
    if (this.state.showModal) {
      console.log(this.state.farm);
      const { farm } = this.state;
      let modalText;
      farm.status === 1 ? 
        modalText = 'Disabling farm will remove farm from home page but will not delete data.'
        : modalText = 'Enabling farm will allow farm to be accessed from home page.';
      
      modal = (
        <Modal 
          displayText={modalText}
          deleteHandler={this.handleDisable}
          cancelHandler={this.hideModal}
        />
      )
    }
    return (
      <>
        <HeaderSection>Farms</HeaderSection>
        <div className='users'>
          {farmList}
          {modal}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    farms: state.farms.farms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateFarm: (data, id ) =>  dispatch(actions.editFarm(data, id )),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FarmList);
