import {SignInPagePresenter} from '../../app/presenters/signInPagePresenter'

describe('SignInPagePresenter', () => {
  context('sign in', () => {
    let signInSpy, presenter
    beforeEach(() => {
      let props = {
        signIn: () => {
        }
      }
      signInSpy = sinon.spy(props, 'signIn')
      presenter = new SignInPagePresenter(props)
      presenter.setState = sinon.spy()
      presenter.getProps().handleChange('email')({target: {value: 'EMAIL'}})
      presenter.getProps().handleChange('password')({target: {value: 'PASSWORD'}})
    })
    it('sign in by action', () => {
      presenter.getProps().signIn()
      signInSpy.should.be.calledWith({email: 'EMAIL', password: 'PASSWORD'})
    })
    it('press enter to sign in', () => {
      let preventDefault = sinon.spy()
      presenter.getProps().keyPress({charCode: 13, preventDefault})
      preventDefault.should.be.called
      signInSpy.should.be.calledWith({email: 'EMAIL', password: 'PASSWORD'})
    })
  })
  context('handle changes', () => {
    let tests = [
      {field: 'email', value: 'EMAIL'},
      {field: 'password', value: 'PASSWORD'}
    ]
    tests.forEach(test => {
      it(`set state for ${test.field}`, () => {
        let presenter = new SignInPagePresenter({})
        presenter.setState = sinon.spy()

        presenter.getProps().handleChange(test.field)({target: {value: test.value}})

        presenter.setState.should.be.calledWith(sinon.match.hasNested(`credential.${test.field}`, test.value))
      })
    })
  })
  context('map props', () => {
    it('from state with theme', () => {
      SignInPagePresenter.mapStateToProps({pageStyle: {muiTheme: {dark: true}}}).should.be.eql({theme: {dark: true}})
    })
    it('with authentication actions', () => {
      SignInPagePresenter.mapDispatchToProps().should.include.keys('signIn')
    })
  })
})
