import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Dashboards } from '../../imports/collections/dashboards';

class DashboardList extends Component {
  state = {
    name: '',
    show: false
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
    this.showForm();
  }
  changeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  }
  showForm = () => {
    this.setState({
      show: !this.state.show
    });
  }
  deleteDashboard = (e, id) => {
    e.preventDefault();

    Meteor.call('dashboard.delete', id);
  }
  renderDashboards = () => {
    return this.props.dashboards
      .sort((a, b) => a.createdAt - b.createdAt)
      .map(dashboard => <li className="dashboard-list__item" key={dashboard._id}>
        <Link className="dashboard-list__item-link" to={`/${dashboard._id}`}>
          <h4 className="dashboard-list__item-title">{dashboard.name}</h4>
          <i
            className="dashboard-list__item-delete fa fa-trash-o"
            aria-hidden="true"
            onClick={(e) => this.deleteDashboard(e, dashboard._id)}
          ></i>
        </Link>
      </li>)
  }
  render() {
    const { name, show } = this.state;
    return(
      <div className="wrapper">
        {this.props.loading ? <div className="loader"><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></div> :
        <div>
          <h1 className="dashboard-list__title">Dashboards</h1>
          <div className="dashboard-list">
            <ul className="dashboard-list__list">
              {this.renderDashboards()}
              <li className={show ? 'dashboard-list__item form' : 'dashboard-list__item'}>
                {show ?
                <form className='dashboard-list__form' onSubmit={this.submitHander}>
                  <div className='dashboard-list__form--header'>
                    <span>Create board</span>
                    <i onClick={this.showForm} className="fa fa-times" aria-hidden="true"></i>
                  </div>
                  <label>Title</label>
                  <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={name}
                    onChange={this.changeHandler}
                  />
                  <button type="submit">Create</button>

                </form> :
                <button className="dashboard-list__button--new" onClick={this.showForm}>Create new board</button>}
              </li>
            </ul>
          </div>
        </div>}
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('dashboards');
  return {
    dashboards: Dashboards.find({}).fetch(),
    loading: !handle.ready(),
  }
})(DashboardList);
