import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import * as CommonActions from '../actions/common'

const Notification = props => (
  <Snackbar
    open={props.notification.open}
    message={props.notification.message}
    autoHideDuration={props.notification.duration}
    onClose={props.closeNotification}/>
)

function mapStateToProps(state) {
  return {
    notification: state.notification
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CommonActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
