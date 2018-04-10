import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './modules/index'
import App from './components/App'
import Login from './components/Login'
import NoMatch from './components/NoMatch'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

render (
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={ Login } />
        <Route exact path='/signin' component={ Login } />
        <Route exact path='/' component={ App } />
        <Route component={ NoMatch } />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)