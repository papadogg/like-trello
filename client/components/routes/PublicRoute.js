import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
  }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <Redirect to="/" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

export default withTracker(() => ({
  isAuthenticated: !!Meteor.userId()
}))(PublicRoute);
