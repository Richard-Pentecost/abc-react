import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppButton from './AppButton';
import SearchBar from './SearchBar';
import '../style/SideBar.scss';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  };

  render() {
    return (
      <div className='sideBar'>
        <div className='sideBar__sort'>
          <Link to={this.props.query('sort', { lastVisit: -1 })}>Last Visited</Link>
          <Link to={this.props.query('sort', { acidDeliveryDate: -1 })}>Next Acid Delivery</Link>
          <Link to={this.props.query('sort', { chlorineDeliveryDate: -1 })}>Next Chlorine Delivery</Link>
        </div>
        <div className='sideBar__search'>
          <SearchBar searchHandler={this.props.searchHandler} />
        </div>
        <div className='sideBar__btn'>
          <AppButton 
            handleClick={() => this.props.history.push('/add-farm')} 
            text='Add Farm'
            icon='plus'
            hide
          />
        </div>
      </div>
    )
  };
}

export default withRouter(SideBar);
