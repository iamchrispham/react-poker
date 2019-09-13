import React, { Component } from "react";
import { API_URL } from "../constants";
import axios from "axios";
import UserCard from "./UserCard";
import "../Profile/Profile.css";

class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("hello");
    axios.get(`${API_URL}/control/${id}`).then(res => {
      this.setState({
        loading: false,
        user: res.data
      });
    });
  }

  // componentWillUnmount() {
  //   this.setState({ _isMounted: false})
  // }

  render() {
    if (this.state.loading) {
      return <h3>Loading...</h3>;
    }
    return (
      <div className="body">
        <div className="container-form">
          <UserCard
            email={this.state.user.email}
            name={this.state.user.name}
            access={this.state.user.access}
            balanceHours={this.state.user.balanceHours}
            qualifierHours={this.state.user.qualifierHours}
            id={this.state.user.id}
            phone={this.state.user.phone}
            checkedIn={this.state.user.checkedIn}
          />
        </div>
      </div>
    );
  }
}

export default SingleUser;
