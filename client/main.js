import React from 'react';
import { render } from 'react-dom';

import AppRouter from './components/routes/AppRouter';

Meteor.startup(() => {
  render(
    <AppRouter/>,
    document.getElementById('app')
  );
});
