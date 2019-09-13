import React, { Component } from 'react';
import SingleUserList from './SingleUserList';
import CreateEditUser from './CreateEditUser';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      id: props.id,
      name: props.name,
      email: props.email,
      phone: props.phone,
      access: props.access,
      balanceHours: props.balanceHours,
      qualifierHours: props.qualifierHours,
      checkedIn: props.checkedIn
    };
    this.onEdit = this.onEdit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  onEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  updateState(email, name, access, balanceHours, qualifierHours, phone, checkedIn) {
    this.setState({
      email: email,
      name: name,
      access: access,
      balanceHours: balanceHours,
      qualifierHours: qualifierHours,
      phone: phone,
      checkedIn: checkedIn
    });
  }

  render() {
    const { email, name, access, balanceHours, qualifierHours, phone, checkedIn } = this.state;
    if (this.state.editing) {
      return (
        <CreateEditUser email={email} name={name} access={access} balanceHours={balanceHours} qualifierHours={qualifierHours} phone={phone} checkedIn={checkedIn} toggleEdit={this.onEdit} id={this.props.id}
                        updateState={this.updateState}/>
      );
    }

    return (
      <SingleUserList email={email} name={name} access={access} onEdit={this.onEdit} id={this.props.id} balanceHours={balanceHours} qualifierHours={qualifierHours} phone={phone} checkedIn={checkedIn} />
    );
  }
}

export default UserCard;