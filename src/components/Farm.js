import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';
import Spinner from './Spinner';
import Table from './Table';
import Modal from './Modal';
import AppButton from './AppButton';
import * as actions from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/Farm.scss';

class Farm extends Component {
  state = { 
    showModal: false,
    selectedId: '',
    records: 'all',
    tableHeadings: [
      'Date',
      'Product',
      'Quantity',
      'Meter Reading',
      'Float Before Reading',
      'Water Usage',
      'Pump Dial',
      'Float',
      'Readings',
      'Comments',
      ''
    ],
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
      const id = this.props.match.params.id;
      this.props.onInitData(id, search);
    };
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })

    let url = `${this.props.location.pathname}`;
    if (value !== 'all') {
      url = this.buildQueryString('records', { searchString: value });
    }
    this.props.history.push(url);
  };


  buildQueryString = (operation, valueObj) => {
    const { search } = this.props.location;
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || '{}'),
        ...valueObj,
      })
    };
    return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
  }
  
  render() {
    const { data, loading } = this.props;
    const selectedFarm = this.selectedFarm();
    let farm;
    if (selectedFarm && data) {
      farm = (
        <>
          <div className='farmHeader'>
            <div className='farmHeader__title'>
              <div className='farmHeader__text'>{selectedFarm.farmName}</div>
              <Link 
                to={{
                  pathname: `${selectedFarm._id}/edit`,
                  aboutProp: {selectedFarm}
                }}
              >
                <span className='farmHeader__link'><FontAwesomeIcon icon={['far', 'edit' ]} /></span>
              </Link>
            </div>
            <div className='farmHeader__info'>
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
          <div className='farmData'>
            <div className='farmData__container'>
              <div className='farmData__actions'>
                <div className='farmDataSelect'>
                  <label className='farmDataSelect__label'>Records:</label>
                  <select name='records' value={this.state.records} className='farmDataSelect__input' onChange={this.handleInputChange}>
                    <option value='1 month'>1 month</option>
                    <option value='3 months'>3 months</option>
                    <option value='6 months'>6 months</option>
                    <option value='1 year'>1 year</option>
                    <option value='all'>all</option>
                  </select>
                </div>
                <div className='farmData__btn'>
                  <AppButton 
                    handleClick={() => this.props.history.push({
                      pathname: `${this.props.location.pathname}/add-data`,
                      state: { id: selectedFarm._id }
                    })} 
                    text='Add Data'
                    icon='plus'
                  />
                </div>
              </div>
              <div className='farmData__data'>
                { this.props.data.length === 0 ?
                    <div className='farmData__data__txt'>No data found</div> :
                    <Table 
                      data={this.props.data} 
                      tableHeadings={this.state.tableHeadings}
                      deleteHandler={this.openModal}
                      clickHandler={this.handleClick}
                    />
                }
              </div>
            </div>
          </div>
        </>
      );
    };

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal 
          displayText='Are you sure you want to delete data?'
          deleteHandler={this.handleDelete}
          cancelHandler={this.hideModal}
        />
      );
    };

    return (
      <div className='farmContainer'>
        { loading ? <Spinner /> : farm }
        {modal}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    farms: state.farms.farms,
    data: state.data.data,
    loading: state.data.loading,
    error: state.data.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFarms: () => dispatch(actions.initFarms()),
    onInitData: (id, search) => dispatch(actions.initData(id, search)),
    onClearState: () => dispatch(actions.clearState()),
    onDeleteData: (farmId, dataId) => dispatch(actions.deleteData(farmId, dataId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Farm);
