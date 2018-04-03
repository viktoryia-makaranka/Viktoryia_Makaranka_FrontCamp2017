import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './modules/index';
import App from './components/App';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

render (
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'),
);