import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import { API_URL } from "./../constants";
import axios from "axios";
import "../Profile/Profile.css";
import AdminControl from "../component/AdminControl";
// import ItemsBody from '../component/ItemsBody'
import { Link } from "react-router-dom";

class Admin extends Component {
  // this.onEdit = this.onEdit.bind(this);
  // this.updateState = this.updateState.bind(this);

  componentWillMount() {
    this.setState({ message: "", admins: {}, users: {} });
  }

  adminPing() {
    const { getAccessToken } = this.props.auth;
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    axios
      .post(`${API_URL}/admin`, {}, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  getAdmins() {
    axios.get(`${API_URL}/admin`).then(response => {
      console.log(response);
      this.setState({ admins: response.data });
    });
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const { message, users, admins } = this.state;
    if (this.state.viewUsers) {
      return (
        <AdminControl
          message={message}
          users={users}
          admins={admins}
          testProps="if you can see this, props passed succesfully!"
        />
      );
    }

    return (
      <div>
        <div className="container-list">
          <h2>You are an Admin!</h2>
          <p>
            Only users who have a <code>scope</code> of{" "}
            <code>write:messages</code> in their <code>access_token</code> can
            see this area. Eventually, read:users, update:users
          </p>
          <hr />

          <h3>Call an Admin endpoint</h3>
          {/* <Button className="btn btn-primary" bsSize="small" onClick={this.adminPing.bind(this)}>
                Post a Message. Or User 
              </Button>
              <Button className="btn btn-secondary" onClick={this.getAdmins.bind(this)}>
                Get Admins 
              </Button> */}

          <Link to="/admin/control">Manage Users</Link>

          <h2>{message}</h2>
        </div>
      </div>
    );
  }
}

export default Admin;
