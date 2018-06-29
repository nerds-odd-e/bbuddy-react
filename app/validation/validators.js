import _ from 'lodash'

export const required = {invalid: value => _.isEmpty(value), message: field => `${_.capitalize(field)} should not be empty`}

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const email = {invalid: value => !value.match(EMAIL_REGEX), message: field => `${_.capitalize(field)} is not valid`}

export const number = {invalid: value => _.chain(value).toNumber().isNaN().value(), message: field => `${_.capitalize(field)} is not a valid number`}
