import _ from 'lodash'

export default class Validation {
  errors={}
  constructor(rules){
    this.rules = rules
  }
  validate(data, success, fail){
    _(this.rules).each((validators, field) => {
      this.errors[field] = _.chain(validators)
        .find(validator => validator.invalid(data[field]))
        .defaultTo({message: () => ''})
        .value()
        .message(field)
    })
    _(this.errors).values().compact().isEmpty() ? success() : fail(this.errors)
  }
}
