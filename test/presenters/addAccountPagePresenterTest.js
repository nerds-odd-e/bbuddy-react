import {AddAccountPagePresenter} from '../../app/presenters/addAccountPagePresenter'

describe('AddAccountPagePresenter', () => {
  context('Save account', () => {
    let addAccountStub, goBackSpy, setStateSpy
    beforeEach(() => {
      let props = {addAccount: () => {}, goBack: () => {}}
      addAccountStub = sinon.stub(props, 'addAccount').yields()
      goBackSpy = sinon.spy(props, 'goBack')
      let presenter = new AddAccountPagePresenter(props)
      presenter.setState = sinon.spy()
      presenter.getProps().handleChange('name')({target: {value: 'CMB'}})
      presenter.getProps().handleChange('balance')({target: {value: '1000'}})
      presenter.getProps().addAccount()
    })
    it('save by action', () => {
      addAccountStub.should.be.calledWith({name: 'CMB', balance: '1000'}, sinon.match.any)
    })
    it('go back after saving', () => {
      goBackSpy.should.be.called
    })
  })
  context('handle changes', () => {
    let tests = [
      {field: 'name', value: 'ICBC'},
      {field: 'balance', value: 100}
    ]
    tests.forEach(test => {
      it(`set state for ${test.field}`, () => {
        let presenter = new AddAccountPagePresenter({})
        presenter.setState = sinon.spy()

        presenter.getProps().handleChange(test.field)({target: {value: test.value}})

        presenter.setState.should.be.calledWith(sinon.match.hasNested(`account.${test.field}`, test.value))
      })
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
