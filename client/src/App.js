// App.js is basically the NavBar
import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import "./Profile/Profile.css";
import logo from "./images/user-solid.png";

// When user logins and arrives at App, can I post user?
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      authenticated: false,
      googleAccount: false
    };
  }

  componentDidMount() {
    const {userProfile, getProfile, isAuthenticated, checkGrav, matchUsernameForId, fetchUser, fetchUsers } = this.props.auth;
    const defaultPicture = logo;
    console.log('App Auth: ', this.props.auth)

  } 

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    // const { isAuthenticated, userHasScopes } = this.props.auth;
    const { isAuthenticated, getUniqueId, adminId, authenticated } = this.props.auth;

    return (
      <header id="showcase">
        <div className="header-nav">
          <Navbar inverse fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/home">
                  <img src={require("./images/rivercitylogo.png")} alt="small logo" />
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav className="navbar-collapse" pullRight>
                <NavItem
                  className="btn-margin"
                  onClick={this.goTo.bind(this, "home")}
                >
                  Home 
                </NavItem>

                {/* Pass props down to Profile HERE */}
                {/* {isAuthenticated() && (
                  <NavItem
                    className="btn-margin"
                    onClick={this.goTo.bind(this, "profile")}
                  >
                    Profile of 
                  </NavItem>
                )} */}

                {isAuthenticated() === true && (
                  <NavItem
                    className="btn-margin"
                    onClick={this.goTo.bind(this, "profile")}
                  >
                    Profile
                    {/* <Link
                      to='/profile'
                      // props={this.props}
                      users={users}
                      profile={this.state.profile}
                      username={this.state.username}
                      avatar={this.state.avatar}
                      userid={this.state.userid}
                      >{this.state.username} Profile Link ID: {this.state.userid}</Link>  */}
                  </NavItem>
                )}


                {isAuthenticated() &&
                getUniqueId() === adminId && ( // remove this ( after uncommenting below.
                    // userHasScopes(["write:messages"]) && (
                    <NavItem
                      className="btn-margin"
                      onClick={this.goTo.bind(this, "admin")}
                    >
                      Admin
                    </NavItem>
                  )}

                {isAuthenticated() && (
                  <NavItem
                    id="qsLogoutBtn"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </NavItem>
                )}
                {!isAuthenticated() && (
                  <NavItem
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </NavItem>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        {/* <div className="footer">
          <div className="footer-content">
            2018 ©
          </div>
        </div> */}
      </header>
    );
  }
}

export default App;
