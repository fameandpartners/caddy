import React from 'react';
import { StaticRouter, RouterContext } from 'react-router';
import { assign } from 'lodash';
import { render } from 'rapscallion';
import { Provider } from 'react-redux';
// import isDev from 'isdev';
// import routes from '../routes';
import AppLayout from '../../src/js/containers/AppLayout';

// Assets
const clientAssets = require('../../build/asset-manifest.json');
const template = require('../template');

// Store
const AppStore = require('../../src/js/stores/AppStore');

function handleRouter(req, res) {
  res.header('Content-Type', 'text/html');
  const context = {};
  const hydratedProps = assign({}, { $$appState: { defaultValue: ['injected'] } });
  const store = AppStore(hydratedProps);

  const ReactRoot = render(
    <StaticRouter location={req.url} {...hydratedProps} context={context}>
      <Provider store={store}>
        <AppLayout />
      </Provider>
    </StaticRouter>,
  );

  const responseRenderer = template({
    root: ReactRoot,
    initialState: store.getState(),
    jsBundle: clientAssets['main.js'],
    cssBundle: clientAssets['main.css'],
  });

  if (context.url) {
    res.writeHead(302, {
      Location: context.url,
    });
    res.end();
  } else {
    responseRenderer.toStream().pipe(res);
  }

  // res
  //   .status(200)
  //   .render('index', {
  //     build: isDev ? null : '../build',
  //     root: html,
  //   });
}

export default function isoMiddleware(req, res) {
  handleRouter(req, res);
}
