import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/SearchBar.scss';

class SearchBar extends Component {
  state = {
    searchValue: ''
  };

  handleChange = event => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchHandler(this.state.searchValue)
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='searchBar'>
        <input 
          className='searchBar__input'
          type='text'
          name='search' 
          value={this.state.searchValue}
          onChange={this.handleChange}
          placeholder='Search'
        />
        <button type='submit' className='searchBar__btn'>
          <span className='searchBar__btnIcon'><FontAwesomeIcon icon={'search'} /></span>
        </button>
      </form>
    );
  }
};

export default SearchBar;
