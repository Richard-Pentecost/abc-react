import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppButton from './AppButton';
import SearchBar from './SearchBar';
import '../style/SideBar.scss';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: '',
    };
  };

  componentDidMount() {
    const searchString = this.props.location.search
    if (searchString) {
      const search = this.extractSearchString(searchString);
      this.setState({ sortValue: search })
    }
  }
  
  componentDidUpdate(prevProps) {
    const searchString = this.props.location.search
    if (prevProps.location.search !== searchString && searchString === '') {
      this.setState({ sortValue:  '' })
    }
  }

  extractSearchString = (searchString) => {
    const index = searchString.indexOf('=')
    const stringLength = searchString.length
    const search = searchString.substring(index + 4, stringLength - 3)
    return search
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ sortValue: value}); 
    if (value !== '') {
      const url = this.props.query('sort', value);
      this.props.history.push(url);
    } else {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div className='sideBar'>
        <div className='sideBar__sort'>
          <label className='sideBar__label'>Sort By:</label>
          <select name='sort' value={this.state.sortValue} onChange={this.handleChange} className='sideBar__select'>
            <option value=''>No Sort</option>
            <option value='lastVisit'>Last Visited Ascending</option>
            <option value='-lastVisit'>Last Visited Descending</option>
            <option value='acidDeliveryDate'>Next Acid Delivery Ascending</option>
            <option value='-acidDeliveryDate'>Next Acid Delivery Descending</option>
            <option value='chlorineDeliveryDate'>Next Chlorine Delivery Ascending</option>
            <option value='-chlorineDeliveryDate'>Next Chlorine Delivery Descending</option>
          </select>
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
