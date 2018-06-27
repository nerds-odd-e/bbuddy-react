import {AuthenticationPresenter} from '../../app/presenters/authenticationPresenter'

describe('AuthenticationPresenter', () => {
  it('redirect to sign in if not authenticated', () => {
    let props = {replace: ()=>{}, isAuthenticated: false, pathname: 'NEED_AUTHENTICATION_PATH'}
    let replaceSpy = sinon.spy(props, 'replace')
    let presenter = new AuthenticationPresenter(props)

    presenter.getProps().checkAuth()

    replaceSpy.should.be.calledWith({
      pathname: "/signin",
      state: {nextPathname: 'NEED_AUTHENTICATION_PATH'}
    })
  })

  context('map props', () => {
    it('from state with authentication status & pathname', () => {
      AuthenticationPresenter.mapStateToProps({
        router: {location: {pathname: 'PATH'}},
        authentication: {isAuthenticated: true}
      }).should.be.eql({
        pathname: 'PATH',
        isAuthenticated: true
      })
    })
    it('with router actions', () => {
      AuthenticationPresenter.mapDispatchToProps().should.include.keys('replace')
    })
  })
})
