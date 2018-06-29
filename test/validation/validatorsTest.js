import {required, email} from '../../app/validation/validators'

describe('Validators', () => {
  describe('required', () => {
    it('test whether value is empty', () => {
      required.invalid('').should.be.true
    })
    it('error message format', () => {
      required.message('name').should.be.eql('Name should not be empty')
    })
  })
  describe('email', () => {
    it('test whether email is valid', () => {
      email.invalid('aaa').should.be.true
    })
    it('error message format', () => {
      email.message('email').should.be.eql('Email is not valid')
    })
  })
})
