import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {

    return(
      <div className="not-found">
        <p>Can not find anything</p>
        <Link to='/'>Go home</Link>
      </div>
    );
  }
}

export default NotFound;
