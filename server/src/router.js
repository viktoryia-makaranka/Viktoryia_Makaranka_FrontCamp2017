import express from 'express';

import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrate } from 'react-dom';

import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from './routes';
import reducers from './modules/index';

import template from './template';

const router = express.Router();

const store = createStore(reducers, global.__INITIAL_STATE__, applyMiddleware(thunk));

router.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route }) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
  });

  return Promise.all(promises).then(() => {
    let context = {};
    const content = renderToString(
      <Provider store={ store }>
        <StaticRouter location={ req.url } context={ context }>
          { renderRoutes(routes) }
        </StaticRouter>
      </Provider>
    );
    res.send(template(content));
  });
});

module.exports = router;