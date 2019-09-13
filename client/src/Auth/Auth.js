import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";
import history from "../history";
import axios from "axios";
import { API_URL } from "../constants";
import logo from "../images/user-solid.png";

export default class Auth {
  userProfile;

  requestedScopes = "openid profile read:messages write:messages";

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: "token id_token",
    scope: this.requestedScopes
  });
  // my keolazy1 adminId. consider using an array for steve and employees
  adminId = "google-oauth2|116920368241262075078";
  authenticated = false;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.userHasScopes = this.userHasScopes.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getUniqueId = this.getUniqueId.bind(this);
    this.checkGrav = this.checkGrav.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.matchUsernameForId = this.matchUsernameForId.bind(this);
  }

  checkGrav(str) {
    let containsGrav = /grav/.test(str);
    return containsGrav;
  }

  fetchUser(id) {
    axios
      .get(`${API_URL}/user/${id}`)
      .then(response => {
        // this.setState({ userid: id, user: response.data }, () =>
        //   this.setState({ state: this.state })
        // )
        this.userid = id;
        this.user = response.data;
      })
      .catch(error => console.log(error));
  }

  fetchUsers() {
    const defaultPicture = logo;
    axios.get(`${API_URL}/user`)
    .then(response => {
      console.log('fetchUsers() Res:', response)
        this.users = response.data
    })

    if(!this.userProfile) {
      this.getProfile((err, profile) => {
        if(this.checkGrav(profile) === true) {
          console.log("Normal Account", profile);
          axios.get(`${API_URL}/user`).then(response => {
            return this.usersObject =
              {
                loading: false,
                profile: profile,
                authenticated: true,
                username: profile.name,
                users: response.data,
                avatar: defaultPicture
              }
            // this.matchUsernameForId(this.userObject.username)
          }
          )} // end of inner if statement

        else if(this.checkGrav(profile) === false) {
          console.log("this must be GMAIL");
          axios.get(`${API_URL}/user`).then(response => {
            return this.usersObject =
              {
                loading: false,
                profile: profile,
                authenticated: true,
                users: response.data,
                username: profile.nickname 
              }
              // this.matchUsernameForId(this.state.username) 
          });
        } 
        else {
            console.log("if and else if didn't happen...");
            this.usersObject = {profile}
        }
      });
    } else {
      this.usersObject =  {profile: this.userProfile }
    }
  }

  matchUsernameForId(string) {
    let uniqueId = -1;
    const usersArray = this.state.users;
    for (let i = 0; i < usersArray.length; i++) {
      let userEmail = usersArray[i].email;
      let re = new RegExp(string, "gi");
      // console.log(userEmail.match(re));
      if (userEmail.match(re).length < 25) {
        console.log("state @ matchUsernameForId: ", this.state);
        console.log("YAY! found an email match with " + usersArray[i].email);

        uniqueId = usersArray[i].id;
        console.log(uniqueId);
        this.fetchUser(uniqueId);
        // return uniqueId;
        break;
      } else {
        console.log("Sorry, username didn't match");
      }
    }
  }

  getUniqueId() {
    if (!this.userProfile) {
      this.getProfile((err, profile) => {
        const uniqueId = profile.sub;
        console.log("userProfile exists @ Auth:", uniqueId);
        return uniqueId;
      });
    } else {
      const uniqueId = this.userProfile.sub;
      // console.log("No userProfile", uniqueId);
      return uniqueId;
    }
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/home");
      } else if (err) {
        history.replace("/home");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || "";

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
    // navigate to the home route
    history.replace("/home");
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

    // handlefetchUserChange? Used in both matchEmail and matchUsername
    // fetchUser(id) {
    //   axios
    //     .get(`${API_URL}/user/${id}`)
    //     .then(response => {
    //       this.setState({ userId: id, user: response.data }, () =>
    //         this.setState({ state: this.state })
    //       );
    //     })
    //     .catch(error => console.log(error));
    // }
  

  // Make Post auth0 user to database function here.
  // postNewUser(userProfile) {
  //   console.log(userProfile);
  //   // if(!userProfile) {
  //   //   this.getProfile( (err, profile) => {
  //   //     this.setState({ profile })
  //   //   })
  //   // } else {
  //   //   this.setState({ profile: userProfile })
  //   // }
  // }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    this.userProfile = null;
    // navigate to the home route
    history.replace("/home");
  }

  // added an if statement.
  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    if(new Date().getTime() < expiresAt) {
      return this.authenticated = true;
    }
  }

  userHasScopes(scopes) {
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }


}

