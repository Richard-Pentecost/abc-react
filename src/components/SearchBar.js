import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/SearchBar.css';

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
      <form onSubmit={this.handleSubmit}>
        <div className='searchBar-container'>
          <input 
            className='searchBar-input'
            type='text'
            name='search' 
            value={this.state.searchValue}
            onChange={this.handleChange}
            placeholder='Search'
          />
          <button type='submit' className='searchBar-btn'>
            <span className='searchBar-btnIcon'><FontAwesomeIcon icon={'search'} /></span>
          </button>
        </div>
      </form>
    );
  }
};

export default SearchBar;
