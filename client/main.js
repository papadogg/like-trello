import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

Meteor.startup(() => {
  render(
    <App/>,
    document.getElementById('app')
  );
});
