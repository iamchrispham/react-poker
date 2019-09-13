// from knexapivid. We can just apply this to our routes.js 
import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <div>
      <nav className="navbar navbar-inverse bg-inverse mb-4">
        <Link to='/' className="navbar-brand">Home</Link>
        <Link to='/login' className="navbar-brand">Login</Link>
        <Link to='/users' className="navbar-brand">Users</Link>
      </nav>      
      <div className="div navbar fixed-bottom">
        <Link to="/new" className="btn btn-outline-primary w-100 p-3">Add New User</Link>
      </div>
      
    </div>
  )
}

 
export default TopNav;




