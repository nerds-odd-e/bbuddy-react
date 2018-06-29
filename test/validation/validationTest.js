import Validation from '../../app/validation/validation'

describe('Validation', () => {
  let success, fail, validation
  beforeEach(() => {
    success = sinon.spy()
    fail = sinon.spy()
  })
  const givenRules = rules => validation = new Validation(rules)
  const validate = () => validation.validate({}, success, fail)
  const valid = (message='ERROR') => ({invalid:()=>false, message: () => message})
  const invalid = (message='ERROR') => ({invalid:()=>true, message: () => message})
  it('invokes success callback when valid', () => {
    givenRules({name: [valid()]})
    validate()
    success.should.be.called
  })
  it('invokes fail callback when invalid', () => {
    givenRules({name: [invalid()]})
    validate()
    fail.should.be.called
  })
  it('has errors for all fields', () => {
    givenRules({name: [invalid('NAME ERROR')], age: [invalid('AGE ERROR')]})
    validate()
    fail.should.be.calledWith({name: 'NAME ERROR', age: 'AGE ERROR'})
  })
  it('fails when any field validation failed', () => {
    givenRules({name: [invalid()], age: [valid()]})
    validate()
    fail.should.be.called
  })
  it('has first error of each field', () => {
    givenRules({name: [valid('NAME ERROR 1'), invalid('NAME ERROR 2')], age: [invalid('AGE ERROR 1'), invalid('AGE ERROR 2')]})
    validate()
    fail.should.be.calledWith({name: 'NAME ERROR 2', age: 'AGE ERROR 1'})
  })
})
