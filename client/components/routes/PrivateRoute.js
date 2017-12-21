import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
  }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to="/login" />
        )
    )} />
  );

export default withTracker(() => ({
  isAuthenticated: !!Meteor.userId()
}))(PrivateRoute);
