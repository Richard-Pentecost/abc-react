import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderSection from './HeaderSection';
import * as actions from '../store/actions';
import '../style/Users.scss';

class Users extends Component {

  componentDidMount() {
    this.props.onInitUsers();
  };

  render() {
    const { users } = this.props;
    console.log(users);
    const userList = users.map(user => (
      <li key={user._id}>{user.name} - {user.username}</li>
    ))
    return (
      <div>
        <HeaderSection>Users</HeaderSection>
        <ul>{userList}</ul>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
