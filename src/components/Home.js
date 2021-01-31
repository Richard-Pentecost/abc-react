import React, { Component } from 'react';
import '../style/Home.scss';
import FarmCard from './FarmCard';
import SideBar from './SideBar';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import qs from 'qs';

class Home extends Component {

  componentDidMount() {
    const { search } = this.props.location;
    this.props.onInitFarms(search);
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
      [operation]: JSON.stringify(valueObj),
    }
    return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
  }

  handleClick = id => {
    this.props.history.push(`/farms/${id}`);
  };

  render() {
    const { farms, loading, error, errorMessage } = this.props;
    let farmList;
    if (farms) {
      farmList = farms.map(farm => {
        return (
          <div className='farmList__card' key={farm._id} >
            <FarmCard 
              farm={farm} 
              clickHandler={() => this.handleClick(farm._id)} 
            />
          </div>
        );
      });
    };

    return (
      <div className='homePage'>
        <div className='sidebar'>
          <SideBar query={this.buildQueryString} searchHandler={this.handleSearch}/>
        </div>
        <div className='farmList'>
          { error ? <div className='error'>{errorMessage.message}</div> :  null}
          { loading ? <Spinner /> : farmList }
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { farms } = state;
  return {
    farms: farms.farms,
    loading: farms.loading,
    error: farms.error,
    errorMessage: farms.errorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFarms: (search) => dispatch(actions.initActiveFarms(search)),
    onDeleteFarm: (id) => dispatch(actions.deleteFarm(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
