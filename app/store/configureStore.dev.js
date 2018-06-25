import { createStore, applyMiddleware, compose } from 'redux'
import DevTools from '../containers/DevTools'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers'
import history from '../history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createLogger()),
    DevTools.instrument()
  )(createStore)

  const store = finalCreateStore(connectRouter(history)(rootReducer), initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
