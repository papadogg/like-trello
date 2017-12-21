import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }
  submitHander = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.setState({
          email: '',
          password: '',
          error: ''
        });
      }
    });
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }
  render() {
    const { email, password } = this.state;
    return(
      <div>
        <form onSubmit={this.submitHander}>
          <input type="text" name="email" value={email} onChange={this.changeHandler} />
          <input type="password" name="password" value={password} onChange={this.changeHandler} />
          <button>Signup</button>
          <Link to="/login">Have an account?</Link>
        </form>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

export default Signup;
