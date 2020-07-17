import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import Modal from './Modal';
import Spinner from './Spinner';
import * as actions from '../store/actions';
import '../style/Users.scss';

class Users extends Component {
  state = {
    showModal: false,
    userId: '',
    tableHeadings: ['Name', 'Username', 'Email', 'Permission Level', ''],
  };

  componentDidMount() {
    this.props.onInitUsers();
  };

  openModal = id => this.setState({ showModal: true, userId: id });

  hideModal = () => this.setState({ showModal: false, userId: '' });

  handleDelete = () => {
    const { userId } = this.state;
    this.props.onDeleteUser(userId);
    this.setState({ showModal: false, userId: '' });
  }

  handleClick = () => {
    console.log('clicked');
  }

  render() {
    const { users } = this.props;
    console.log(users);
    const formattedUsersArray = users.map(user => {
      return  {
        '_id': user._id,
        'data': {
          'name': user.name,
          'username': user.username,
          'email': user.email,
          'permissionLevel': user.permissionLevel,
        },
      }
    });

    let table = null;
    if (users) {
      table = <Table 
          data={formattedUsersArray} 
          tableHeadings={this.state.tableHeadings}
          deleteHandler={this.openModal}
          clickHandler={this.handleClick}
        /> 
    }

    let modal = null; 
    if (this.state.showModal) {
      modal = (
        <Modal 
          displayText='Are you sure you want to delete this user?'
          deleteHandler={this.handleDelete}
          cancelHandler={this.hideModal}
        />
      )
    }
    return (
      <div className='users'>
        {table}
        {modal}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitUsers: () => dispatch(actions.initUsers()),
    onDeleteUser: id => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
