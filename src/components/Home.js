import React, { Component } from 'react';
import '../style/Home.scss';
import FarmCard from './FarmCard';
import SideBar from './SideBar';
import Spinner from './Spinner';
import Modal from './Modal';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import qs from 'qs';

class Home extends Component {
  state = { 
    showModal: false,
    selectedId: '', 
  };

  componentDidMount() {
    this.props.onInitFarms();
  };

  componentDidUpdate(prevProps) {
    const { search } = this.props.location;
    if (prevProps.location.search !== search) {
      this.props.onInitFarms(search);
    };
  };

  handleSearch = searchValue => {
    let url = '/';
    if (searchValue) {
      url = this.buildQueryString('query', { searchString: searchValue });
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

  handleClick = id => {
    this.props.history.push(`/farms/${id}`);
  };
  
  openModal = id => {
    this.setState({ showModal: true, selectedId: id });
  };

  hideModal = () => {
    this.setState({ showModal: false, selectedId: '' });
  };

  handleDelete = () => {
    this.props.onDeleteFarm(this.state.selectedId);
    this.setState({
      showModal: false,
      selectedId: '',
    });
  }


  render() {
    const { farms, loading } = this.props;
    let farmList;
    if (farms) {
      farmList = farms.map(farm => {
        return (
          <div className='farmList__card' key={farm.farmName} >
            <FarmCard 
              farm={farm} 
              clickHandler={() => this.handleClick(farm._id)} 
              deleteHandler={() => this.openModal(farm._id)}
            />
          </div>
        );
      });
    };

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal 
          displayText='Deleting this farm will permanently remove all data associated with this farm.
          Do you want to continue?'
          deleteHandler={this.handleDelete}
          cancelHandler={this.hideModal}
        />
      );
    };

    return (
      <div className='homePage'>
        <div className='sidebar'>
          <SideBar query={this.buildQueryString} searchHandler={this.handleSearch}/>
        </div>
        <div className='farmList'>
          { loading ? <Spinner /> : farmList }
          {modal}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    farms: state.farms.farms,
    error: state.farms.error,
    loading: state.farms.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFarms: (search) => dispatch(actions.initFarms(search)),
    onDeleteFarm: (id) => dispatch(actions.deleteFarm(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
