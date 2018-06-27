import {SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from '../../app/constants/authentication'
import {signIn, doSignIn} from '../../app/actions/authentication'
import {push} from 'connected-react-router'

describe('authentication', () => {
  let dispatch, getState, credential
  beforeEach(() => {
    dispatch = sinon.stub().returns(Promise.resolve({}))
    getState = sinon.stub()
    credential = {}
  })
  context('sign in', () => {
    it('dispatch sign in', () => {
      signIn(credential)(dispatch, getState)
      dispatch.should.be.calledWith(doSignIn(credential))
    })
    it('go home when sign in success', () => {
      dispatch.returns(Promise.resolve({type: SIGN_IN_SUCCESS}))
      getState.returns({router: {location: {state: undefined}}})
      signIn(credential)(dispatch, getState)
      dispatch.should.be.calledWith(push('/'))
    })
    it('go back to existing previous path when sign in success', () => {
      dispatch.returns(Promise.resolve({type: SIGN_IN_SUCCESS}))
      getState.returns({router: {location: {state: {nextPathname: 'NEXT_PATH'}}}})
      signIn(credential)(dispatch, getState)
      dispatch.should.be.calledWith(push('NEXT_PATH'))
    })
    it('no go home when sign in fail', () => {
      dispatch.returns(Promise.resolve({type: SIGN_IN_FAILURE}))
      signIn(credential)(dispatch, getState)
      dispatch.should.not.be.calledWith(push('/'))
    })
  })
})
