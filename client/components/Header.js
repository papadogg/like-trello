import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

const Header = (props) => {
  return(
    <div className="header">
      <h2 className="header__title"><Link to='/'>Like trello</Link></h2>
      {props.isAuthenticated && <button className="header__logout-btn" onClick={() => Accounts.logout()}>Logout</button>}
    </div>
  );
}

export default withTracker(() => ({
  isAuthenticated: !!Meteor.userId()
}))(Header);
