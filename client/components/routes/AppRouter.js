import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from '../Header';
import DashboardList from '../DashboardList';
import Dashboard from '../Dashboard';
import Login from '../Login';
import NotFound from '../NotFound';
import Signup from '../Signup';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

class AppRouter extends Component {
  render() {
    return(
      <Router>
        <div>
          <Header />
          <Switch>
            <PrivateRoute exact path='/' component={DashboardList} />
            <PublicRoute exact path='/signup' component={Signup} />
            <PublicRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/:id' component={Dashboard} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
