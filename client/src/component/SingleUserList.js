// Create Edit Todo
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "../Profile/Profile.css";

const SingleUserList = ({
  onEdit,
  name,
  history,
  id,
  email,
  balanceHours,
  access,
  qualifierHours,
  phone,
  checkedIn
}) => {
  // Insert some Handler to AutoRefresh Page after updateState?
  return (
    <div className="container-list-single">
      <h5>Checked In = Green - Checked out = Red</h5>
      <div
        className={`card ${
          access === 'admin' ? "bg-success" : "bg-danger"
        } text-white`}
      >
        <div className="card-block">
          <div className="card-title">
            <h4>Edit User</h4>
          </div>

          <div className="card-text">
            {access === "admin"
              ? "User has Admin Access"
              : "User has Member Access"}
          </div>

          <div className="card-text">Name: {name}</div>
          <div className="card-text">Email: {email}</div>
          <div className="card-text">Phone: {phone}</div>

          <div className="card-text">Balance Hours: {balanceHours}</div>

          <div className="card-text">Qualifier Hours: {qualifierHours}</div>

          <div className="card-text">
            CheckIn Status: {checkedIn === true ? "Yes" : "No"}
          </div>

          <div className="d-flex justify-content-between align-items-end mt-5">
            <button
              className="btn btn-link text-white"
              onClick={() => {
                axios.delete(`/api/user/${id}`).then(() => {
                  history.push("/");
                });
              }}
            >
              Delete User
            </button>
            <button className="btn btn-link text-white" onClick={onEdit}>
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SingleUserList);
