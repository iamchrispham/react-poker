import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./Profile.css";
// import axios from "axios";
// import { API_URL } from "../constants";
// import logo from "../images/user-solid.png";
// const db = require('../../db')

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Should be changed by Profile.
      user: {},
      loading: true,
      isMounted: ""
    };
  }

  // test if Auth methods work below.
  componentWillMount() {
    const { checkGrav, fetchUsers, matchUsernameForId } = this.props.auth
    const usersObject = null;
    fetchUsers();
    console.log('checking for usersObject', usersObject)
  } 

  render() {
    console.log('state @ render', this.state)
    const { username, avatar, user } = this.state;
    // Handle conditional render code below
    // if (!this.state.user.balanceHours) {
    //   return (
    //     <div>
    //       Loading... If stats do not render, please try refreshing.{" "}
    //       {profile} - {user.balanceHours}
    //     </div>
    //   );
    // }

    return (
      <div>
        <div className="profile">
          <img
            src={avatar}
            className="profile-default"
            alt="profile"
          />

          <div className="details">
            <ListGroup>
              {/* <div className="userdatalist"> */}
              <div className="username">
                {/* Can fix the default profile picture sizing issue
                      by resizing the src/images/user-solid.png manually  */}
                <i className="far fa-user-circle"> {username}</i>
              </div>
              {/* Changed profile.nickname to profile.name */}
              <div className="userdatalist">
                <div className="userbalance">
                  <i className="far fa-clock"> Balance: {user.balanceHours}</i>
                </div>
                <div className="userqualifier">
                  {/* <i className="far fa-heart"> */}
                  {/* <i className="far fa-bookmark"> */}
                  {/* <i className="far fa-bell"> */}
                  <i className="far fa-thumbs-up">
                    {" "}
                    {/* <button class="pulse-button"> */}
                    {/* <a class="btn-floating pulse"><i class="material-icons">menu</i></a> */}
                    Qualifier: {user.qualifierHours}
                  </i>
                  {/* </button> */}
                </div>
              </div>
              {/* </div> */}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
