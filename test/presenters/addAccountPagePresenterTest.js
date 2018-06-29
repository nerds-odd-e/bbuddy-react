import {AddAccountPagePresenter} from '../../app/presenters/addAccountPagePresenter'

describe('AddAccountPagePresenter', () => {
  context('Save account', () => {
    let addAccountStub, goBackSpy, presenter
    beforeEach(() => {
      let props = {
        addAccount: () => {
        }, goBack: () => {
        }
      }
      addAccountStub = sinon.stub(props, 'addAccount').yields()
      goBackSpy = sinon.spy(props, 'goBack')
      presenter = new AddAccountPagePresenter(props)
      presenter.setState = sinon.spy()
      presenter.getProps().handleChange('name')({target: {value: 'CMB'}})
      presenter.getProps().handleChange('balance')({target: {value: '1000'}})
    })
    it('save by action', () => {
      presenter.getProps().addAccount()
      addAccountStub.should.be.calledWith({name: 'CMB', balance: '1000'}, sinon.match.any)
    })
    it('go back after saving', () => {
      presenter.getProps().addAccount()
      goBackSpy.should.be.called
    })
    context('validation error', () => {
      it('name should not be empty', () => {
        presenter.getProps().handleChange('name')({target: {value: ''}})
        presenter.getProps().addAccount()
        presenter.setState.should.be.calledWith(sinon.match.hasNested('errors.name', 'Name should not be empty'))
        addAccountStub.should.not.be.called
      })
      it('balance should not be empty', () => {
        presenter.getProps().handleChange('balance')({target: {value: ''}})
        presenter.getProps().addAccount()
        presenter.setState.should.be.calledWith(sinon.match.hasNested('errors.balance', 'Balance should not be empty'))
        addAccountStub.should.not.be.called
      })
      it('balance should be a number', () => {
        presenter.getProps().handleChange('balance')({target: {value: 'a'}})
        presenter.getProps().addAccount()
        presenter.setState.should.be.calledWith(sinon.match.hasNested('errors.balance', 'Balance is not a valid number'))
        addAccountStub.should.not.be.called
      })
    })
  })
  context('handle changes', () => {
    let presenter
    beforeEach(() => {
      presenter = new AddAccountPagePresenter({})
      presenter.setState = sinon.spy()
    })
    let tests = [
      {field: 'name', value: 'ICBC'},
      {field: 'balance', value: 100}
    ]
    tests.forEach(test => {
      it(`set state for ${test.field}`, () => {
        presenter.getProps().handleChange(test.field)({target: {value: test.value}})

        presenter.setState.should.be.calledWith(sinon.match.hasNested(`account.${test.field}`, test.value))
      })
    })
    it('clear changed field error', () => {
      presenter.getProps().addAccount()
      presenter.getProps().handleChange('name')({target: {value: 'a'}})

      presenter.setState.should.be.calledWith(
        sinon.match.hasNested('errors.name', '')
          .and(sinon.match.hasNested('errors.balance', sinon.match(value => !!value))))
    })
  })
  context('map props', () => {
    it('from state with nothing', () => {
      AddAccountPagePresenter.mapStateToProps().should.be.eql({})
    })
    it('with account & navigation actions', () => {
      AddAccountPagePresenter.mapDispatchToProps().should.include.keys('addAccount', 'goBack')
    })
  })
})
