import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

import { Dashboards } from '../../imports/collections/dashboards';

class DashboardList extends Component {
  state = {
    name: ''
  }
  submitHander = (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (!name.trim()) {
      return;
    }
    Meteor.call('dashboard.add_new', name);
    this.setState({
      name: ''
    });
  }
  changeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  }
  renderDashboards = () => {
    return this.props.dashboards.map(dashboard => <li key={dashboard._id}>
        <Link to={`/${dashboard._id}`}>{dashboard.name}</Link>
      </li>)
  }
  render() {
    return(
      <div>
        <button onClick={() => Accounts.logout()}>Logout</button>
        <h1>Dashboards</h1>
        <form onSubmit={this.submitHander}>
          <input type="text" value={this.state.name} onChange={this.changeHandler} />
          <button>Create</button>
        </form>
        <ul>
          {this.renderDashboards()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('dashboards');
  return {
    dashboards: Dashboards.find({}).fetch()
  }
})(DashboardList);
