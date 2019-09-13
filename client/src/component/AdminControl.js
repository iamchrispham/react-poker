import React, { Component } from "react";
import ListUsers from "./ListUsers";
import ListUser from "./ListUser";
import { API_URL } from "../constants";
import axios from "axios";
import _ from "lodash";
import "../Profile/Profile.css";
// import "../Admin/Admin.css";
// import { Button } from "react-bootstrap";

// If you want a function to be executed after the state change occurs, pass it in as a callback.
// exp) this.setState({ message: "hello"}, function(){ console.log(this.state.message)})
class AdminControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: {}
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}/admin/users`).then(response => {
      console.log(response);
      this.setState({
        loading: false,
        users: response.data
      });
    });
  }

  renderUsers() {
    return _.map(this.state.users, user => {
      return (
        <ListUser
          key={user.id}
          id={user.id}
          name={user.name}
          access={user.access}
          email={user.email}
          phone={user.phone}
          balanceHours={user.balanceHours}
          qualifierHours={user.qualifierHours}
        />
      );
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.loading) return <div>Component Loading...</div>;

    return (
      <div className="container-list">
        <div>All Users List</div>
        <ListUsers>
          <div>{this.renderUsers()}</div>
        </ListUsers>
      </div>
    );
  }
}

export default AdminControl;
