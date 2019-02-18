import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

class AddFriendInput extends Component {

  render() {
    return (
      <form>
        <div>
          <input
            name="userName"
            type="text"
            autoFocus="true"
            className={classnames('form-control', styles.addFriendInput)}
            placeholder="Type the name of a friend"
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <span className="errorMsg">{this.state.errors.userName}</span>
          <span className="errorMsg">{this.state.errors.gender}</span>
        </div>
        <div onClick={this.handleGender.bind(this)} className="col-align">
          <input type="radio" name="gender" value="male" /> Male
          <input type="radio" name="gender" value="female" /> Female
       </div>
        <div>
          <button type='submit' onClick={this.handleSubmit.bind(this)} className="addBtn">Add</button>
        </div>
      </form>
    );
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      gender: this.props.gender || '',
      fields: {},
      errors: {}
    };
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
    let fields = this.state.fields;
    fields['userName'] = e.target.value;
    this.setState({
      fields
    });
  }
  handleGender(e) {
    this.setState({ gender: e.target.value });
    let fields = this.state.fields;
    fields['gender'] = e.target.value;
    this.setState({
      fields
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const name = this.state.name;
      const gender = this.state.gender;

      this.props.addFriend(name, gender);
      this.setState({ name: '' });
    }

  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["userName"]) {
      formIsValid = false;
      errors["userName"] = "Please enter your username. ";
    }

    if (typeof fields["userName"] !== "undefined") {
      if (!fields["userName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["userName"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["gender"]) {
      formIsValid = false;
      errors["gender"] = "Please enter your gender.";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
