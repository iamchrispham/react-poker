  // By the time componentDidMount is called, the component has been rendered once.
  // Consider logic from SingleItem. match email instead of :id?

  // 1) get userProfile Object - then user.email - from this.props.auth
  //    done for me already and stored in this.state.profile object.
  // 2) From profile object, set user.email/googleNickname in state. 
  // 3) using the userEmail in state, Match "users" item that regex matches the userEmail or googleUserName with database entries.
  // 4) set Matched "users"-item.id to userId in state.
    // 5) Use userId to make a /user/:id request.
  // 6) set response.data to user: {} in state. 

fetch(person(this.state.person))
  .then(response => {
    if(!response.ok) {
      throw Error("Network Request Failed");
    }
    return response
  })
  .then(d => d.json())
  .then(d => {
    this.setState({
      cardData: d
    })

    fetch(`http://localhost:3008/planets/${d.homeworld}`)
      .then(data => data.json())
      .then(data => {
        this.setState({
          homeData: data
        })
      })
  }, () => {
    this.setState({
      requestFailed: true
    })
  })

// Uniquely Identify Users Auth0
/*

1) by "user_id" property. Guaranteed to be unique per user such as
    {identity provider id}|{unique id in the provider}, or facebook|1234567890)
2) by natural key like "email" property. In this case, enable email verification and only use this option with providers that require users verify their emails.
