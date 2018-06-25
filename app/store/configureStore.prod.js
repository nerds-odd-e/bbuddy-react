import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'
import history from '../history'

import { connectRouter, routerMiddleware } from 'connected-react-router'

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    applyMiddleware(routerMiddleware(history)),
  )(createStore)

  return finalCreateStore(connectRouter(history)(rootReducer), initialState)
}
