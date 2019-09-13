// Works with ProfileUser.js
import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./Profile.css";
import axios from "axios";
import { API_URL } from "../constants";
// import logo from "../images/user-solid.png";
import ProfileUser from './ProfileUser';


class Profile extends Component {
  
  getProfile(err, pr


  // moved initial setState to constructor above.
  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    // Imported from line 6
    console.log(this.props.auth);
    const defaultPicture = logo;

    if (!userProfile) {
      getProfile((err, profile) => {
        if (this.checkGrav(profile.picture) === true) {
          profile.picture = defaultPicture;
          // set variable form instead of setState
          newProfile = profile;
          emailString = profile.name
          this.matchEmail(emailString);
          this.getUser(userId)
          // console.log(this.state);
        }
        // google signins return usernames as "profile.nickname" (keolazy1).
        else if (this.checkGrav(profile.picture) === false) {
          console.log("This must be a gmail account... ");
          // this.setState({ profile, emailString: profile.nickname });
          // set variable form instead of setState
          newProfile = profile;
          emailString = profile.nickname;
          this.matchEmail(emailString);
          this.getUser(userId);
        } else {
          console.log("if and else if, didn't happen....");
          // set variable form instead of setState
          profile = profile
        }
      });
    } else {
      // this.setState({ profile: userProfile });
      // set variable form instead of setState
      profile = userProfile
    }

    axios.get(`${API_URL}/user`).then(response => {
      console.log(response);
      // set variable form instead of setState
      users = response.data
      // console.log(this.state.emailString);
      this.matchEmail(this.state.emailString);
      matchEmail(emailString)
      console.log(this.state); 
    });

  }

  checkGrav(str) {
    let containsGrav = /grav/.test(str);
    // console.log(containsGrav);
    return containsGrav;
  }

  matchEmail(string) {
    console.log(string);
    const usersArray = users;
    for (let i = 0; i < usersArray.length; i++) {
      let userEmail = usersArray[i].email;
      let re = new RegExp(string, "gi");
      // console.log(userEmail.match(re));
      if (userEmail.match(re)) {
        console.log("YAY! found an email match with " + usersArray[i].email);
        // set variable form instead of setState
        userId = usersArray[i].id;
      } else {
        console.log("Sorry, no matches");
      }
    }
  }

  getUser(input) {
    console.log("getUser being called");
    const id = input;
    axios
      .get(`${API_URL}/user/${id}`)
      .then(response => {
        console.log(response.data); // returns (1) user object that matches auth.
        // set variable form instead of setState
        user = response.data;
      })
      .catch(error => console.log(error));
  }

    

  //   axios.get(`${API_URL}/user`)
  //   .then(response => {
  //     console.log('fetch to /user worked' + response);
  //     this.setState({
  //       loading: false,
  //       users: response.data
  //     });
  //     console.log(this.state);
  //   })
  //   .catch(error => console.log(error))
  // }

  // checkGrav(str) {
  //   let containsGrav = /grav/.test(str);
  //   // console.log(containsGrav);
  //   return containsGrav;
  // }

  // matchEmail(string) {
  //   console.log('Attempting to match ' + string);
  //   const usersArray = this.state.users;
  //   console.log(usersArray)
  //     for (let i = 0; i < usersArray.length; i++) {
  //       let userEmail = usersArray[i].email;
  //       let re = new RegExp(string, "gi");
  //       if (userEmail.match(re)) {
  //         console.log("YAY! found an email match with " + usersArray[i].email);
  //         this.setState({ userId: usersArray[i].id });
  //       } 
  //     }
  // }


  // getUser(input) {
  //   console.log('getUser being called')
  //   const id = input;
  //   axios
  //     .get(`${API_URL}/user/${id}`)
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({ user: response.data });
  //     })
  //     .catch(error => console.log(error));
  // }

  render() {
    const { profile, users, emailString, userId, user } = this.state;
    return (
      <div>
        <div className="profile">
          <img
            src={profile.picture}
            className="profile-default"
            alt="profile"
          />

          <div className="details">
            <ListGroup>
              {/* <div className="userdatalist"> */}
              <div className="username">
                {/* Can fix the default profile picture sizing issue
                      by resizing the src/images/user-solid.png manually  */}
                <i className="far fa-user-circle"> {profile.name} - {emailString}</i>
              </div>
              {/* Changed profile.nickname to profile.name */}
              <div className="userdatalist">
                <div className="userbalance">
                  {/* <i className="far fa-clock"> Balance: {user.balanceHours}</i> */}
                </div>
                <div className="userqualifier">
                  <i className="far fa-thumbs-up">
                    {/* Qualifier: {user.qualifierHours} */}
                  </i>
                  {/* </button> */}
                </div>
              </div>
              {/* </div> */}
            </ListGroup>
          </div>
        </div>
        
        <div className="d-flex justify-content-center align-items-center">
        <ProfileUser profile={profile} users={users} username={emailString} userId={userId} user={user}/>
        </div>

      </div>
    );
  }
}

export default Profile;
