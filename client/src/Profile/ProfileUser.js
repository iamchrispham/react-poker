import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from "../constants";

class ProfileUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: this.props.users,
      username: this.props.username,
      userId: this.props.userId
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getUserById(this.state.userId)
    this.setState(
      { users: nextProps.users, username: nextProps.username, userId: nextProps.id})
      console.log(this.state);

  }
  
  // getUserById
  getUserById(input) {
    const id = input;
    axios
      .get(`${API_URL}/user/${id}`)
      .then(response => {
        console.log(response.data); // returns (1) user that matches auth0.
        this.setState({ user: response.data });
      })
      .catch(error => console.log(error));
  }

  render() { 
    const { username } = this.state;
    if(!this.state.username) {
      return <div>No users to render yet...</div>
    }

    return ( 
      <div>
        <div className="d-flex justify-content-center align-items-center">
          Hello Mr. {this.props.profile.name} aka "{this.props.username} - id: {this.props.userId} - balance: {this.props.balanceHours}"
        </div>
        <div>
          <div>Username: {username}</div>
        </div>
      </div>
    );
  }
}
 
export default ProfileUser;