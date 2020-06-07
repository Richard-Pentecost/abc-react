import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';
import Spinner from './Spinner';
import Table from './Table';
import Modal from './Modal';
import AppButton from './AppButton';
import SearchBar from './SearchBar';
import * as actions from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/Farm.css';

class Farm extends Component{
  state = { 
    showModal: false,
    selectedId: '',
  };
  
  componentDidMount() {
    if (this.props.farms.length === 0) {
      this.props.onInitFarms();
    };
    const id = this.props.match.params.id;
    this.props.onInitData(id);
  };

  componentWillUnmount() {
    this.props.onClearState();
  };

  selectedFarm = () => {
    const { id } = this.props.match.params;
    const { farms } = this.props;
    return farms.find(farm => farm._id === id);
  };

  hideModal = () => this.setState({ showModal: false, selectedId: '' });

  openModal = id => this.setState({ showModal: true, selectedId: id });
  

  handleDelete = () => {
    const dataId = this.state.selectedId;
    const farmId = this.props.match.params.id;
    this.props.onDeleteData(farmId, dataId);
    this.setState({
      showModal: false,
      selectedId: '',
    });
  }

  handleClick = (input) => {
    const dataId = input._id;
    this.props.history.push({
      pathname: `${this.props.location.pathname}/${dataId}`,
      state: { input }
    });
  };

  componentDidUpdate(prevProps) {
    const { search } = this.props.location;
    if (search !== prevProps.location.search) {
      console.log(search);
      // call API with redux
    };
  };

  handleSearch = searchValue => {
    // console.log(searchValue);
    const url = this.buildQueryString('query', { title: { $regex: searchValue }});
    this.props.history.push(url);
  };

  buildQueryString = (operation, valueObj) => {
    const { search } = this.props.location;
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    console.log('currentQueryParams', currentQueryParams);
    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || '{}'),
        ...valueObj,
      }),
    };
    console.log('newQueryParams', newQueryParams);
    console.log(qs.stringify(newQueryParams, {addQueryPrefix: true, encode: false}));
    return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
  };

  render() {
    const selectedFarm = this.selectedFarm();
    let farm = <Spinner />;
    if (selectedFarm) {
      farm = (
        <>
          <div className='farmHeader-container'>
            <div className='farmHeader-title'>
              <div className='farmHeader-text'>{selectedFarm.farmName}</div>
              <Link 
                to={{
                  pathname: `${selectedFarm._id}/edit`,
                  aboutProp: {selectedFarm}
                }}
              >
                <span className='farmHeader-link'><FontAwesomeIcon icon={['far', 'edit' ]} /></span>
              </Link>
            </div>
            <div className='farmHeader-info'>
              <div>
                <label>Contact: </label>
                <span>{selectedFarm.contactName}</span>
              </div>
              <div>
                <label>Number: </label>
                <span>{selectedFarm.contactNumber}</span>
              </div>
              <div>
                <label>Postcode: </label>
                <span>{selectedFarm.postcode}</span>
              </div>
            </div>
          </div>
          <AppButton 
            handleClick={() => this.props.history.push({
              pathname: `${this.props.location.pathname}/add-data`,
              state: { id: selectedFarm._id }
            })} 
            text='Add Data'
            icon='plus'
          />
          { this.props.data.length === 0 ?
              <div>No data found</div> :
              <Table 
                data={this.props.data} 
                deleteHandler={this.openModal}
                clickHandler={this.handleClick}
              />
          }
        </>
      );
    };
    
    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal 
          displayText='Are you sure you want to delete the data'
          deleteHandler={this.handleDelete}
          cancelHandler={this.hideModal}
        />
      );
    };

    return (
      <div className='farmContainer'>
        {farm}
        {modal}
        <SearchBar searchHandler={this.handleSearch} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    farms: state.farms.farms,
    data: state.data.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFarms: () => dispatch(actions.initFarms()),
    onInitData: (id) => dispatch(actions.initData(id)),
    onClearState: () => dispatch(actions.clearState()),
    onDeleteData: (farmId, dataId) => dispatch(actions.deleteData(farmId, dataId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Farm);