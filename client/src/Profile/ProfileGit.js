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

  // handleUserFetchChange? Used in both matchEmail and matchUsername
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

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    const defaultPicture = logo;
    // console.log(this.props.users)
    console.log("Profile auth: ", this.props.auth);

    // Async fetch. if/else logic should only run after this.
    axios.get(`${API_URL}/user`).then(response => {
      this.setState({
        loading: false,
        users: response.data
      });
    });

    // pass callback in setState to ensure proper reconciliation OR componentDidUpdate
    if (!userProfile) {
      getProfile((err, profile) => {
        if (this.checkGrav(profile.picture) === true) {
          console.log("this must be a normal account", profile);
          profile.picture = defaultPicture;
          axios.get(`${API_URL}/user`).then(response => {
            console.log("No userProfile fetch: ", response);
            this.setState(
              {
                loading: false,
                profile,
                username: profile.name,
                users: response.data
              },
              this.matchEmailForId(profile.name)
            );
          });
        }
        // google signins return usernames as "profile.nickname" (keolazy1).
        else if (this.checkGrav(profile.picture) === false) {
          console.log("This must be a GMAIL account... ");
          axios.get(`${API_URL}/user`).then(response => {
            console.log(response);
            this.setState(
              {
                loading: false,
                profile,
                username: profile.nickname,
                users: response.data
              },
              this.matchUsernameForId(this.state.username)
            );
          });
        } else {
          console.log("if and else if, didn't happen....");
          this.setState({ profile });
        }
      });
    } else {
      this.setState({ profile: userProfile });
    }
  } 
  End of componentWillUnount()


  checkGrav(str) {
    let containsGrav = /grav/.test(str);
    return containsGrav;
  }



  match function for email. FOR normal.
  matchEmailForId(str) {
    let uniqueId = -1;
    const usersArray = this.state.users;
    for (let i = 0; i < usersArray.length; i++) {
      let userEmail = usersArray[i].email;
      console.log(userEmail);
      if (userEmail === str) {
        console.log("YAY! found an email match with " + usersArray[i].email);
        uniqueId = usersArray[i].id;
        console.log(uniqueId);
        this.userFetch(uniqueId);
        break;
      } else {
        // uniqueId = usersArray[i].id;
        // console.log(uniqueId);
        console.log("Sorry, email didn't match");
      }
    }
  }



  handle change
  refreshUser() {
    console.log("handled change")
  }

  userNameCheck() {
    let userNameExists = false;
    for(let i = 0; i < this.state.users.length; i++) {
      // profile.nickname is for gmail signins ONLY
      if(this.state.users.username[i] === this.state.profile.nickname) {
        console.log('Do not post b/c username exists already')
        userNameExists = true;
      } else if(this.state.users.username[i] !== this.profile.nickname) {
        console.log("username does not match this iteration")
      }
      // If loop does not return a match. 
      if(userNameExists === false) {
        axios.post(`${API_URL}/user`, {
          username: this.state.profile.nickname,
          name: this.state.profile.name
        })
      }
    }  
  }