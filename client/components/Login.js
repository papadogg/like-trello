import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  }
  submitHander = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({
          error: 'Unable to login. Check email and password.'
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
          <button>Login</button>
          <Link to="/signup">Need an account?</Link>
          <p>{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default Login;
