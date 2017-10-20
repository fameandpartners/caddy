/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './containers/AppLayout';


// Store
import AppStore from './stores/AppStore';

// eslint-disable-next-line
const hydrated = (typeof window === 'object') ? window.__data : {};
const store = AppStore(hydrated);

const component = (
  <BrowserRouter>
    <Provider store={store}>
      <AppLayout {...hydrated} />
    </Provider>
  </BrowserRouter>
);
ReactDOM.render(
  component,
  document.getElementById('root'),
);
