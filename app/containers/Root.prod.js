import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import Router from '../router'
import history from '../history'
import { ConnectedRouter } from 'connected-react-router'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router store={store}/>
        </ConnectedRouter>
      </Provider>
    )
  }
}
