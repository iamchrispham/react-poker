import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { API_URL } from "../constants";
import "../Profile/Profile.css";

class SingleUserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || "",
      name: props.name,
      email: props.email || "",
      access: props.access || "",
      balanceHours: props.balanceHours || "",
      qualifierHours: props.qualifierHours || "",
      phone: props.phone || ""
    };

    this.onChangeItem = this.onChangeItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeItem(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      email,
      name,
      access,
      phone,
      balanceHours,
      qualifierHours,
      checkedIn
    } = this.state;
    const { id, history } = this.props;
    //We're editing
    if (id) {
      axios
        .patch(`${API_URL}/user/${id}`, {
          email: email,
          name: name,
          phone: phone,
          access: access,
          balanceHours: balanceHours,
          qualifierHours: qualifierHours,
          checkedIn: checkedIn
        })
        .then(() => {
          this.props.updateState(email, access);
          this.props.toggleEdit();
        });
    } else {
      //we're not
      axios
        .post(`${API_URL}/user`, {
          email: email,
          balanceHours: balanceHours,
          access: access,
          qualifierHours: qualifierHours,
          phone: phone
        })
        .then(() => {
          history.push("/");
        });
    }
  }

  render() {
    const {
      access,
      // email,
      name,
      phone,
      balanceHours,
      qualifierHours,
      checkedIn
    } = this.state;
    return (
      <div className="body">
        <div className="container-form-edit">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Name: {name}</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={this.onChangeItem}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Balance Hours: {balanceHours}</label>
              <input
                name="balanceHours"
                type="text"
                className="form-control"
                id="balanceHours"
                value={balanceHours}
                onChange={this.onChangeItem}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Qualifier Hours: {qualifierHours}</label>
              <input
                name="qualifierHours"
                type="text"
                className="form-control"
                id="qualifierHours"
                value={qualifierHours}
                onChange={this.onChangeItem}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone: {phone}</label>
              <input
                name="phone"
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={this.onChangeItem}
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkedIn">CheckIn Status: {checkedIn}</label>
              <select
                name="checkedIn"
                className="form-control"
                id="checkedIn"
                value={checkedIn}
                onChange={this.onChangeItem}
              >
                <option value="true">Checked In</option>
                <option value="false">Checked Out</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="access">Club Access Type: {access}</label>
              <select
                name="access"
                className="form-control"
                id="access"
                value={access}
                onChange={this.onChangeItem}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                {/* <option value="daily">Walk In</option>   */}
              </select>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <button type="submit" className="btn btn-primary">
                Submit New Info
              </button>
              <button
                type="buttom"
                className="btn btn-danger"
                onClick={this.props.toggleEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleUserEdit);
