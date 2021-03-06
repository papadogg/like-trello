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
      <div className="auth">
        <form className="auth__form" onSubmit={this.submitHander}>
          <h1 className="auth__title">Join</h1>
          <input
            className="auth__input"
            placeholder="Email"
            autoComplete="off"
            type="text"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
          <input
            className="auth__input"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.changeHandler}
          />
          <p className="auth__error">{this.state.error}</p>
          <button className="auth__btn">Create account</button>
          <Link className="auth__link" to="/login">Have an account?</Link>
        </form>
      </div>
    );
  }
}

export default Signup;
