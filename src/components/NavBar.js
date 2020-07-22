import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import abcLogo from '../abcLogo.png';
import DropDown from './DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/NavBar.scss';

class NavBar extends Component {
  state = {
    open: false,
  };
  container = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        open: false,
      });
    };
  };

  handleClick = () => {
    const status = this.state.open;
    this.setState({ open: !status });
  };
  
  render () {
    const { authenticate, onLogout, token } = this.props;
    let isAdmin;
    if (token) {
      isAdmin = token.permissionLevel === 'admin';
    }
    const dropDown = (
      <div className='navbar__item' ref={this.container} onClick={this.handleClick}>
        <span className='navbar__text' >
          Menu <FontAwesomeIcon icon={'caret-down'} />
          { this.state.open && <DropDown 
              hideDropDown={this.handleClick}
              onLogout={onLogout}
              isAdmin={isAdmin} 
            /> }
        </span>
      </div>
    )

    return (
      <div className='navbar'>
        <div className='navbar__title'>
          <Link to='/home' className='link'>ABC</Link>
        </div>
        {authenticate() ? dropDown : null }
      </div>
    );
  }
}

export default NavBar;

// <img src={abcLogo} alt='logo' />