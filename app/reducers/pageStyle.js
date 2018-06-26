import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import merge from 'lodash/merge'
import * as CommonConstants from '../constants/common'


export default function pageStyle(state = { muiTheme: createMuiTheme(), mobile: false }, action) {
  if (action.type === CommonConstants.RESIZE_DEVICE){
    return merge({}, state, { width: action.payload.width, mobile: action.payload.width < 990})
  }
  return state;
}
