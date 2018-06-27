import { CALL_API } from '../middleware/api'
import * as AuthenticationConstants from '../constants/authentication'
import {push} from 'connected-react-router'
import * as CommonActions from './common'

export function doSignIn(credential){
  return {
    [CALL_API]: {
      types: [AuthenticationConstants.SIGN_IN_REQUEST, AuthenticationConstants.SIGN_IN_SUCCESS, AuthenticationConstants.SIGN_IN_FAILURE],
      endpoint: `login`,
      method: 'POST',
      data: credential
    }
  }
}

export function signIn(credential){
  return (dispatch, getState) => {
    dispatch(doSignIn(credential))
      .then(action => {
        if (action.type === AuthenticationConstants.SIGN_IN_SUCCESS){
          let locationState = getState().router.location.state
          dispatch(push(locationState && locationState.nextPathname? locationState.nextPathname : '/'))
        } else {
          dispatch(CommonActions.openNotification('Email and password are invalid.'))
        }
      })
  }
}

