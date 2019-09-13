import React, { Component } from 'react';
import ItemsBody from '../ItemsBody';


class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Dashboard. This is protected route. You Can only see this if you're authed.</h3>
        GET request here w/ axios to pull specific user info.
        <ItemsBody />
      </div>
    )
  }
}

export default Dashboard;

// Write a route for /dashboard/:id?
