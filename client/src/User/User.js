import axios from 'axios';
import {API_URL} from '../constants';
// import logo from "../images/user-solid.png";

export default class User {
  constructor() {
    this.checkGrav = this.checkGrav.bind(this)
    this.matchUsernameForId = this.matchUsernameForId.bind(this)
    this.userFetch = this.userFetch.bind(this)
    // this.componentDidMount()
  }
  checkGrav(str) {
    let containsGrav = /grav/.test(str);
    return containsGrav;
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
        this.userFetch(uniqueId);
        // return uniqueId;
        break;
      } else {
        console.log("Sorry, username didn't match");
      }
    }
  }

  userFetch(id) {
    axios
      .get(`${API_URL}/user/${id}`)
      .then(response => {
        this.setState({ userid: id, user: response.data }, () =>
          this.setState({ state: this.state })
        );
      })
      .catch(error => console.log(error));
  }

//  componentDidMount(props) {
//   console.log('routes mounted! Here are my props: ', props);
//   const {userProfile, getProfile, isAuthenticated } = this.props.auth;
//   const defaultPicture = logo;
//   console.log('App Auth: ', this.props.auth)

//   if(isAuthenticated()) {
//     this.setState( { authenticated: true })
//   }

//   axios.get(`${API_URL}/user`)
//   .then(response => {
//     console.log('Home Res:', response)
//     this.setState({
//       loading:false,
//       users: response.data
//     })
//   })

//   // Normal Account.
//   if(!userProfile) {
//     getProfile((err, profile) => {
//       if(this.checkGrav(profile) === true) {
//         console.log("Normal Account", profile);
//         // profile.picture = defaultPicture;
//         axios.get(`${API_URL}/user`).then(response => {
//           console.log('No userProfile fetch: ');
//           console.log('profile: ', profile)
//           this.setState(
//             {
//               loading: false,
//               profile,
//               autenticated: true,
//               username: profile.name,
//               users: response.data,
//               avatar: defaultPicture
//             }, this.matchUsernameForId(this.state.username));
//         })
//       }
//       else if(this.checkGrav(profile) === false) {
//         console.log("this must be GMAIL");
//         axios.get(`${API_URL}/user`).then(response => {
//           console.log('response: ', response);
//           console.log('profile: ', profile)
//           this.setState(
//             {
//               loading: false,
//               profile,
//               autenticated: true,
//               users: response.data,
//               username: profile.nickname // profile.nicname goes here
//             }, this.matchUsernameForId(this.state.username)
//           );
//         });
//       } else {
//           console.log("if and else if didn't happen...");
//           this.setState({profile})
//       }
//     });
//   } else {
//     this.setState( {profile: userProfile })
//   }
// }

}