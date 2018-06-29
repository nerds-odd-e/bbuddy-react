import {required, email, number} from '../../app/validation/validators'

describe('Validators', () => {
  describe('required', () => {
    it('invalid when value is empty', () => {
      required.invalid('').should.be.true
    })
    it('valid when value is not empty', () => {
      required.invalid('aaa').should.be.false
    })
    it('error message format', () => {
      required.message('name').should.be.eql('Name should not be empty')
    })
  })
  describe('email', () => {
    it('invalid when email format is wrong', () => {
      email.invalid('aaa').should.be.true
    })
    it('valid when email format is good', () => {
      email.invalid('valid@email.com').should.be.false
    })
    it('error message format', () => {
      email.message('email').should.be.eql('Email is not valid')
    })
  })
  describe('number', () => {
    it('invalid when value is letters', () => {
      number.invalid('aaa').should.be.true
    })
    it('valid when number is valid', () => {
      number.invalid('10').should.be.false
    })
    it('negative is valid', () => {
      number.invalid('-10').should.be.false
    })
    it('error message format', () => {
      number.message('balance').should.be.eql('Balance is not a valid number')
    })
  })
})
