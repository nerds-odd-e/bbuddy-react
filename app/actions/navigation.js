import { goBack as back, push} from 'connected-react-router';

export function goBack(){
  return (dispatch, getState) => {
    dispatch(back())
  }
}

export function goToAddAccount(){
  return (dispatch, getState) => {
    dispatch(push('/accounts/add'))
  }
}
