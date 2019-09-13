import React from "react";
import { Link } from "react-router-dom";
import "../Profile/Profile.css";

const ListUser = ({
  id,
  name,
  access,
  phone,
  email,
  balanceHours,
  qualifierHours,
  checkedIn
}) => {
  return (
    <div className="container-list-group">
      <Link
        to={`/control/${id}`}
        className={`list-group-item ${
          checkedIn === true ? "bg-success" : "bg-danger"
        }
     text-black mb-3 d-flex justify-content-center align-items-center`}
      >
        <h3>id: {id}</h3>
        <h3>Email: {email}</h3>
        <h3>Name: {name}</h3>
        <h3>Access: {access}</h3>
        <h3>Phone: {phone}</h3>
        <h3>Balance Hours: {balanceHours}</h3>
        <h3>Qualifier Hours: {qualifierHours}</h3>
        <h3>CheckIn Status: {checkedIn}</h3>
      </Link>
    </div>
  );
};

export default ListUser;
