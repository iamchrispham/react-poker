// // CLASS BASED routes.js pass props down to children.
// import React, { Component } from 'react';
// import { Redirect, Route, Router } from "react-router-dom";
// import App from "./App";
// import Home from "./Home/Home";
// import Profile from "./Profile/Profile";
// import Ping from "./Ping/Ping";
// import Admin from "./Admin/Admin";
// import Callback from "./Callback/Callback";
// import Auth from "./Auth/Auth";
// import history from "./history";
// import AdminControl from './component/AdminControl';
// import SingleUser from './component/SingleUser';
// // import Main from "./component/Main";
// import axios from "axios";
// import { API_URL } from "./constants";
// import logo from "./images/user-solid.png";

// const auth = new Auth();

// const handleAuthentication = ({ location }) => {
//   if (/access_token|id_token|error/.test(location.hash)) {
//     auth.handleAuthentication();
//   }
// };


// export default class Routez extends Component {
//   constructor(props) {
//   super(props)

//   this.state = {
//     users: {}
//   }
// }

// componentWillMount() {
//   const { userProfile, getProfile } = this.props.auth;
//   const defaultPicture = logo;
//   console.log('Routez Auth:', this.props.auth);

//   // Async Fetch.
//   axios.get(`${API_URL}/user`).then(response => {
//     this.setState({
//       loading: false,
//       users: response.data
//     })
//   })

//       // pass callback in setState to ensure proper reconciliation OR componentDidUpdate
//       // if (!userProfile) {
//       //   getProfile((err, profile) => {
//       //     if (this.checkGrav(profile.picture) === true) {
//       //       console.log("this must be a normal account", profile);
//       //       profile.picture = defaultPicture;
//       //       axios.get(`${API_URL}/user`).then(response => {
//       //         console.log("No userProfile fetch: ", response);
//       //         this.setState(
//       //           {
//       //             loading: false,
//       //             profile,
//       //             username: profile.name,
//       //             users: response.data
//       //           },
//       //           this.matchEmailForId(profile.name)
//       //         );
//       //       });
//       //     }
//       //     // google signins return usernames as "profile.nickname" (keolazy1).
//       //     else if (this.checkGrav(profile.picture) === false) {
//       //       console.log("This must be a GMAIL account... ");
//       //       axios.get(`${API_URL}/user`).then(response => {
//       //         console.log(response);
//       //         this.setState(
//       //           {
//       //             loading: false,
//       //             profile,
//       //             username: profile.nickname,
//       //             users: response.data
//       //           },
//       //           this.matchUsernameForId(this.state.username)
//       //         );
//       //       });
//       //     } else {
//       //       console.log("if and else if, didn't happen....");
//       //       this.setState({ profile });
//       //     }
//       //   });
//       // } else {
//       //   this.setState({ profile: userProfile });
//       // }

// }

//   render() {
//     return (
//       <div>
//       {/* {this.profile} */}
//       <Router history={history}>
//         <div>
//           <Route path="/" render={props => <App auth={auth} {...props} />} />

//           <Route
//             path="/home"
//             render={props => <Home auth={auth} {...props} /> 
//             }
//           />
          
//           <Route
//             path="/profile"
//             render={props =>
//               !auth.isAuthenticated() ? (
//                 <Redirect to="/home" />
//               ) : (
//                 <Profile auth={auth} {...props} />
//               )
//             }
//           />

//           <Route
//             path="/ping"
//             render={props =>
//               !auth.isAuthenticated() ? (
//                 <Redirect to="/home" />
//               ) : (
//                 <Ping auth={auth} {...props} />
//               )
//             }
//           />

//           <Route
//             path="/admin"
//             render={props =>
//               !auth.isAuthenticated() ? (
//                 // || !auth.userHasScopes(["write:messages"])
//                 <Redirect to="/home" />
//               ) : (
//                 <Admin auth={auth} {...props} />
//               )
//             }
//           />

//           <Route
//             path="/admin/control"
//             render={props => 
//               !auth.isAuthenticated() ? (
//                 <Redirect to="/home" />
//               ) : (
//                 <AdminControl auth={auth} {...props} />
//               )
//             }
//           />

//           <Route 
//             path='/control/:id' exact
//             render={props => 
//               !auth.isAuthenticated() ? (
//                 <Redirect to="/home" />
//               ) : (
//               <SingleUser {...props} /> )
//             }
//           />

//           {/* <Route 
//             path='/admin/control/:id'
//             render={(props) =>
//             props.id ? (
//             <SingleUser {...props}/> 
//             )
//             : ( <Redirect to="/admin" />)
//             }
//           /> */}

//           {/* <Route path='/user/new' component={CreateUser} /> */}

//           <Route
//             path="/callback"
//             render={props => {
//               handleAuthentication(props);
//               return <Callback {...props} />;
//             }}
//           />

//         </div>
//       </Router>
//     </div>
//     )
//   }
// }