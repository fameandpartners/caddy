/* global window */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AppStore from '../js/stores/AppStore';

it('renders without crashing', () => {
  const store = AppStore();
  const div = window.document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
<div></div>
    </MemoryRouter>,
    div,
  );
});
