import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import Welcome from '../src/js/Welcome';
import App from '../src/js/App';
// import Home from './containers/Home';
// import Test from './containers/Test';

export default (
  <Route path="/">
    <IndexRoute component={App} />
    <Route path="/welcome" component={Welcome} />
  </Route>
);
