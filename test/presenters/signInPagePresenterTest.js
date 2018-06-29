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
      presenter.getProps().handleChange('email')({target: {value: 'VALID@EMAIL.COM'}})
      presenter.getProps().handleChange('password')({target: {value: 'PASSWORD'}})
    })
    it('sign in by action', () => {
      presenter.getProps().signIn()
      presenter.getProps().errors.should.be.eql({email: '', password: ''})
      signInSpy.should.be.calledWith({email: 'VALID@EMAIL.COM', password: 'PASSWORD'})
    })
    it('press enter to sign in', () => {
      let preventDefault = sinon.spy()
      presenter.getProps().keyPress({charCode: 13, preventDefault})
      preventDefault.should.be.called
      signInSpy.should.be.calledWith({email: 'VALID@EMAIL.COM', password: 'PASSWORD'})
    })
    context('validation error', () => {
      it('email should not be empty', () => {
        presenter.getProps().handleChange('email')({target: {value: ''}})
        presenter.getProps().signIn()
        presenter.setState.should.be.calledWith(sinon.match.hasNested('errors.email', 'Email should not be empty'))
        signInSpy.should.not.be.called
      })
      it('email should be a valid email', () => {
        presenter.getProps().handleChange('email')({target: {value: 'abc'}})
        presenter.getProps().signIn()
        presenter.setState.should.be.calledWith(sinon.match.hasNested('errors.email', 'Email is not valid'))
        signInSpy.should.not.be.called
      })
      it('password should not be empty', () => {
        presenter.getProps().handleChange('password')({target: {value: ''}})
        presenter.getProps().signIn()
        presenter.setState.should.be.calledWith(sinon.match.hasNested('errors.password', 'Password should not be empty'))
        signInSpy.should.not.be.called
      })
      it('show all fields error', () => {
        presenter.getProps().handleChange('email')({target: {value: ''}})
        presenter.getProps().handleChange('password')({target: {value: ''}})
        presenter.getProps().signIn()
        presenter.setState.should.be.calledWith({errors: {email: 'Email should not be empty', password: 'Password should not be empty'}})
      })
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
    it('clear changed field error', () => {
      let presenter = new SignInPagePresenter({})
      presenter.setState = sinon.spy()

      presenter.getProps().signIn()
      presenter.getProps().handleChange('email')({target: {value: 'a'}})

      presenter.setState.should.be.calledWith(
        sinon.match.hasNested('errors.email', '')
          .and(sinon.match.hasNested('errors.password', sinon.match(value => !!value))))
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
