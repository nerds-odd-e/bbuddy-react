import React from 'react'
import { connect } from 'react-redux'

export default Presenter => ComposedComponent => connect(Presenter.mapStateToProps, Presenter.mapDispatchToProps)(class extends React.Component {
  presenter = new Presenter(this.props, (updater, callback) => this.setState(updater, callback))
  componentWillMount() {
    this.presenter.loadData && this.presenter.loadData()
  }
  shouldComponentUpdate(nextProps) {
    this.presenter.updateProps(nextProps)
    return true
  }
  render() {
    return(
      <ComposedComponent {...this.presenter.getProps()} {...this.state}/>
    )
  }
})
