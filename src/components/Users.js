import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import Modal from './Modal';
import HeaderSection from './HeaderSection';
import * as actions from '../store/actions';
import '../style/Users.scss';

class Users extends Component {
  state = {
    showModal: false,
    userId: '',
    tableHeadings: ['Name', 'Username', 'Email', 'Permission Level', ''],
  };

  openModal = id => this.setState({ showModal: true, userId: id });

  hideModal = () => this.setState({ showModal: false, userId: '' });

  handleDelete = () => {
    const { userId } = this.state;
    this.props.onDeleteUser(userId);
    this.setState({ showModal: false, userId: '' });
  }

  render() {
    const { users, isAdmin } = this.props;

    const formattedUsersArray = users.map(user => {
      return  {
        '_id': user._id,
        'data': {
          'name': user.name,
          'username': user.username,
          'email': user.email,
          'permissionLevel': user.permissionLevel,
        },
      };
    });

    let table = null;
    if (users) {
      table = <Table 
          data={formattedUsersArray} 
          tableHeadings={this.state.tableHeadings}
          isAdmin={isAdmin}
          deleteHandler={this.openModal}
          clickHandler={() => {}}
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
      <>
        <HeaderSection>Users</HeaderSection>
        <div className='users'>
          {table}
          {modal}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    isAdmin: state.auth.token.permissionLevel === 'admin',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: id => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
